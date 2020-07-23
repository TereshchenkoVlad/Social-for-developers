export type AlertType = 'danger' | 'notification' | 'success'

export interface Alert {
   id: string
   msg: string
   alertType: AlertType
}
