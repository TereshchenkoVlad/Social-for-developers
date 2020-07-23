import React, { useState, FC } from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../types/actions/app.actions'
import { bindActionCreators } from 'redux'
import { register } from '../../redux/actions/auth'
import { AppState } from '../../redux/configureStore'

import '../../styles/Auth.scss'
import developWhite from '../../assets/images/developWhite.png'

export type SignupFormData = {
   name: string
   email: string
   password: string
   password2: string
}

type SignupProps = LinkStateToProps & LinkDispatchProps & {}

const Signup: FC<SignupProps> = ({ register, isAuthenticated }) => {
   const [formData, setFormData] = useState<SignupFormData>({
      name: '',
      email: '',
      password: '',
      password2: '',
   })

   const { name, email, password, password2 } = formData

   const onChange = (e: any) =>
      setFormData({ ...formData, [e.target.name]: e.target.value })

   const submitForm = async (e: any) => {
      e.preventDefault()
      register({ name, email, password })
   }

   if (isAuthenticated) {
      return <Redirect to='/dashboard' />
   }

   return (
      <div className='auth-inner'>
         {/* ADS */}
         <div className='auth-inner_ads'>
            <h1 className='auth-inner_ads-title'>DEV</h1>
            <h2 className='auth-inner_ads-subtitle'>ACCOUNT</h2>
            <img
               className='auth-inner_ads-icon'
               src={developWhite}
               alt='develop white'
            />
         </div>

         {/* Content */}
         <div className='auth-inner_content'>
            <h3 className='auth-inner_content-title'>Sign Up</h3>
            <p className='auth-inner_content-subtitle'>
               Please fill in this form to create an account!
            </p>
            <form className='auth-inner_content-form' onSubmit={submitForm}>
               <div className='auth-inner_content-input_block'>
                  <label>Name</label>
                  <input
                     value={name}
                     onChange={e => onChange(e)}
                     className='auth-inner_content-input'
                     type='text'
                     name='name'
                     placeholder='Enter your name'
                     required
                  />
               </div>

               <div className='auth-inner_content-input_block'>
                  <label>Email</label>
                  <input
                     value={email}
                     onChange={e => onChange(e)}
                     className='auth-inner_content-input'
                     type='email'
                     name='email'
                     placeholder='Enter your email'
                     required
                  />
               </div>

               <div className='auth-inner_content-input_block'>
                  <label>Password</label>
                  <input
                     value={password}
                     onChange={e => onChange(e)}
                     className='auth-inner_content-input'
                     type='password'
                     name='password'
                     placeholder='8-15 Characters'
                     minLength={6}
                     required
                  />
               </div>
               <div className='auth-inner_content-input_block'>
                  <label>Confirm Password</label>
                  <input
                     value={password2}
                     onChange={e => onChange(e)}
                     className='auth-inner_content-input'
                     type='password'
                     name='password2'
                     placeholder='Confirm your password'
                     minLength={6}
                     required
                  />
               </div>
               <button className='auth-inner_content-button'>Sign Up</button>
            </form>
         </div>
      </div>
   )
}

interface LinkStateToProps {
   isAuthenticated: boolean | null
}

interface LinkDispatchProps {
   register: (data: { name: string; email: string; password: string }) => void
}

const mapStateToProps = (state: AppState) => ({
   isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = (disaptch: ThunkDispatch<any, any, AppActions>) => ({
   register: bindActionCreators(register, disaptch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
