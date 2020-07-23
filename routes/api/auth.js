const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select('-password')
      res.json(user)
   } catch (e) {
      res.status(500).send('Server error!')
   }
})

// @route   POST api/auth
// @desc    Authenticate user & Get token
// @access  Public
router.post(
   '/',
   [
      check('email', 'Please include a valid email!').isEmail(),
      check('password', 'Passport is required!').exists(),
   ],
   async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
      }

      const { email, password } = req.body

      try {
         // See if user exist
         let user = await User.findOne({ email })
         if (!user) {
            return res
               .status(400)
               .json({ errors: [{ msg: 'Invalid credentials!' }] })
         }

         // Check password similarity
         const isMatch = await bcrypt.compare(password, user.password)
         if (!isMatch) {
            return res
               .status(400)
               .json({ errors: [{ msg: 'Invalid credentials!' }] })
         }

         // Return jsonwebtoken
         const payload = {
            user: { id: user.id },
         }

         jwt.sign(
            payload,
            config.get('jwtSecret'),
            // { expiresIn: 3600 },
            (err, token) => {
               if (err) throw new err()
               res.json({ token })
            }
         )
      } catch (e) {
         console.error(e.message)
         res.status(500).send('Server error!')
      }
   }
)

module.exports = router
