import axios from 'axios'
import { Dispatch } from 'redux'
import { AppActions } from '../../types/actions/app.actions'
import { setAlert } from './alert'
import { ErrorType } from '../../types/Error'
import { setAuthToken } from '../../utils/setAuthToken'

type RegisterFuncProps = {
   name: string
   email: string
   password: string
}

// Load user
export const loadUser = () => async (dispatch: Dispatch<AppActions>) => {
   if (localStorage.token) {
      setAuthToken(localStorage.token)
   }

   try {
      const res = await axios.get('/api/auth')
      dispatch({ type: 'USER_LOAD_SUCCESS', user: res.data })
   } catch (e) {
      console.log(e)
      dispatch({ type: 'USER_LOAD_FAIL' })
   }
}

// Register user
export const register = ({
   name,
   email,
   password,
}: RegisterFuncProps) => async (dispatch: Dispatch<AppActions>) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
      },
   }
   const body = JSON.stringify({ name, email, password })
   try {
      const res = await axios.post('/api/users', body, config)
      dispatch({ type: 'REGISTER_SUCCESS', token: res.data.token })
      dispatch<any>(loadUser())
   } catch (err) {
      const errors = err.response.data.errors
      if (errors) {
         errors.forEach((e: ErrorType) => {
            dispatch<any>(setAlert(e.msg, 'danger'))
         })
      }
      dispatch({ type: 'REGISTER_FAIL' })
   }
}

// Login user
export const login = (email: string, password: string) => async (
   dispatch: Dispatch<AppActions>
) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
      },
   }
   const body = JSON.stringify({ email, password })
   try {
      const res = await axios.post('/api/auth', body, config)
      dispatch({ type: 'LOGIN_SUCCESS', token: res.data.token })
      dispatch<any>(loadUser())
   } catch (err) {
      const errors = err.response.data.errors
      if (errors) {
         errors.forEach((e: ErrorType) => {
            dispatch<any>(setAlert(e.msg, 'danger'))
         })
      }
      dispatch({ type: 'LOGIN_FAIL' })
   }
}

// Logout
export const logOut = (): AppActions => ({
   type: 'LOG_OUT',
})
