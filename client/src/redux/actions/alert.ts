import { v4 } from 'uuid'
import { Dispatch } from 'redux'

import { AlertType } from '../../types/Alert'
import { AppActions } from '../../types/actions/app.actions'

export const setAlert = (msg: string, alertType: AlertType) => (
   dispatch: Dispatch<AppActions>
) => {
   const id = v4()
   dispatch({
      type: 'SET_ALERT',
      alert: { msg, alertType, id },
   })

   setTimeout(() => {
      dispatch(removeAlert(id))
   }, 2000)
}

export const removeAlert = (id: string): AppActions => ({
   type: 'REMOVE_ALERT',
   id,
})
