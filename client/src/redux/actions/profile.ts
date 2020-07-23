import { Dispatch } from 'redux'
import { AppActions } from '../../types/actions/app.actions'
import axios from 'axios'

// Get current user profile
export const getProfile = () => async (dispatch: Dispatch<AppActions>) => {
   try {
      const res = await axios.get('/api/profile/me')
      dispatch({ type: 'GET_PROFILE', profile: res.data })
   } catch (e) {
      dispatch({
         type: 'GET_PROFILE_FAIL',
         error: { msg: e.response.statusText, status: e.response.status },
      })
   }
}