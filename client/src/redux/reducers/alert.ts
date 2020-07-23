import { Alert } from '../../types/Alert'
import { AlertActionTypes } from '../../types/actions/alert.actions'

const initialState: Alert[] = []

export default (state = initialState, action: AlertActionTypes): Alert[] => {
   switch (action.type) {
      case 'SET_ALERT':
         return [...state, action.alert]
      case 'REMOVE_ALERT':
         return state.filter(alert => alert.id !== action.id)
      default:
         return state
   }
}
