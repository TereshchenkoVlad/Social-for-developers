import React, { useState, FC } from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../types/actions/app.actions'
import { bindActionCreators } from 'redux'
import { login } from '../../redux/actions/auth'
import { AppState } from '../../redux/configureStore'

import '../../styles/Auth.scss'
import developWhite from '../../assets/images/developWhite.png'

export type LoginFormData = {
   email: string
   password: string
}

type LoginProps = LinkStateToProps & LinkDispatchToProps & {}

const Login: FC<LoginProps> = ({ login, isAuthenticated }) => {
   const [formData, setFormData] = useState<LoginFormData>({
      email: '',
      password: '',
   })

   const { email, password } = formData

   const onChange = (e: any) =>
      setFormData({ ...formData, [e.target.name]: e.target.value })

   const submitForm = async (e: any) => {
      e.preventDefault()
      login(email, password)
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
            <h3 className='auth-inner_content-title'>Sign In</h3>
            <p className='auth-inner_content-subtitle'>
               Please sign into your account!
            </p>
            <form className='auth-inner_content-form' onSubmit={submitForm}>
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
                     required
                  />
               </div>
               <button type='submit' className='auth-inner_content-button'>
                  Sign In
               </button>
            </form>
         </div>
      </div>
   )
}

interface LinkStateToProps {
   isAuthenticated: boolean | null
}

interface LinkDispatchToProps {
   login: (email: string, password: string) => void
}

const mapStateToProps = (state: AppState) => ({
   isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
   login: bindActionCreators(login, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
