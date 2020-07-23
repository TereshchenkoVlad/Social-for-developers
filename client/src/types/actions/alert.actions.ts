import { AlertType } from '../Alert'

const SET_ALERT = 'SET_ALERT'
const REMOVE_ALERT = 'REMOVE_ALERT'

export interface SetAlertAction {
   type: typeof SET_ALERT
   alert: {
      id: string
      msg: string
      alertType: AlertType
   }
}

export interface RemoveAlertAction {
   type: typeof REMOVE_ALERT
   id: string
}

export type AlertActionTypes = SetAlertAction | RemoveAlertAction
