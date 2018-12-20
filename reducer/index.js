import { ADD_DOCK, RECEIVE_DOCKS } from '../actions'


function entries (state = {}, action) {
    switch (action.type) {
      case RECEIVE_DOCKS :
        return {
          ...state,
          ...action.entries,
        }
      case ADD_DOCK :
        return {
          ...state,
          ...action.entry
        }
      default :
        return state
    }
  }
  
  export default entries