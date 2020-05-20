const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const config = require('config')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
   '/',
   [auth, [check('text', 'Text is required').not().isEmpty()]],
   async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({ error: errors.array() })
      }

      try {
         const user = await User.findById(req.user.id).select('-password')
         const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
         })
         const post = await newPost.save()
         res.json(post)
      } catch (e) {
         console.error(e.message)
         res.status(500).send('Server error!')
      }
   }
)

// @route   GET api/posts
// @desc    Gets all posts
// @access  Private
router.get('/', auth, async (req, res) => {
   try {
      const posts = await Post.find().sort({ date: -1 })
      res.json(posts)
   } catch (error) {
      console.error(e.message)
      res.status(500).send('Server error!')
   }
})

// @route   GET api/posts/:id
// @desc    Gets post by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.id)

      if (!post) {
         res.status(404).json({ msg: 'Post not found!' })
      }

      res.json(post)
   } catch (e) {
      console.error(e.message)
      if (e.name === 'CastError') {
         return res.status(400).json({ msg: 'Post not found!' })
      }
      res.status(500).send('Server error!')
   }
})

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.id)

      if (!post) {
         res.status(404).json({ msg: 'Post not found!' })
      }

      if (post.user.toString() !== req.user.id) {
         return res.status(401).json({ msg: 'User not authorized!' })
      }

      post.remove()
      res.json({ msg: 'Post deleted!' })
   } catch (e) {
      console.error(e.message)
      if (e.name === 'CastError') {
         return res.status(400).json({ msg: 'Post not found!' })
      }
      res.status(500).send('Server error!')
   }
})

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.id)

      if (!post) {
         return res.status(404).json({ msg: 'Post not found!' })
      }
      // Check if the post has already been liked
      const checkPost =
         post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
      if (checkPost) {
         return res.status(400).json({ msg: 'Post already liked!' })
      }

      post.likes.unshift({ user: req.user.id })
      await post.save()
      res.json(post.likes)
   } catch (e) {
      console.error(e.message)
      if (e.name === 'CastError') {
         return res.status(400).json({ msg: 'Post not found!' })
      }
      res.status(500).send('Server error!')
   }
})

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.id)

      if (!post) {
         return res.status(404).json({ msg: 'Post not found!' })
      }

      // Check if the post has not yet been liked
      const checkPost =
         post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
      if (checkPost) {
         return res.status(400).json({ msg: 'Post has not yet been liked!' })
      }

      // Get remove index
      const removeIndex = post.likes
         .map(like => like.user.toString())
         .indexOf(req.user.id)

      if (removeIndex === -1) {
         return res.status(400).json({ msg: 'Bad request!' })
      }

      post.likes.splice(removeIndex, 1)
      await post.save()
      res.json(post.likes)
   } catch (e) {
      console.error(e.message)
      if (e.name === 'CastError') {
         return res.status(400).json({ msg: 'Post not found!' })
      }
      res.status(500).send('Server error!')
   }
})

// @route   POST api/posts/comment/:post_id
// @desc    Create comment
// @access  Private
router.post(
   '/comment/:post_id',
   [auth, [check('text', 'Text is required').not().isEmpty()]],
   async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({ error: errors.array() })
      }

      try {
         const user = await User.findById(req.user.id).select('-password')
         const post = await Post.findById(req.params.post_id)

         if (!post) {
            return res.status(404).json({ msg: 'Post not found!' })
         }

         const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
         }
         post.comments.unshift(newComment)

         await post.save()
         res.json(post.comments)
      } catch (e) {
         console.error(e.message)
         res.status(500).send('Server error!')
      }
   }
)

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.post_id)

      // Get remove index
      const removeIndex = post.comments
         .map(com => com.id.toString())
         .indexOf(req.params.comment_id)

      if (removeIndex === -1) {
         return res.status(400).json({ msg: 'Comment does not exist!' })
      }

      // Check user
      if (req.user.id !== post.comments[removeIndex].user.toString()) {
         return res.status(401).json({ msg: 'User not authorized!' })
      }

      post.comments.splice(removeIndex, 1)
      await post.save()
      res.json(post.comments)
   } catch (e) {
      console.error(e.message)
      res.status(500).send('Server error!')
   }
})

module.exports = router
