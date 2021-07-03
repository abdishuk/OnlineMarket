import{ USER_PROFILE_REQUEST,USER_PROFILE_SUCCESS,USER_PROFILE_FAIL,USER_PROFILE_UPDATE_REQUEST,USER_PROFILE_UPDATE_SUCCESS,USER_PROFILE_UPDATE_FAIL} from '../actions/types.js'

export const userProfile=(state={},action)=>{
    
    switch(action.type){
        case USER_PROFILE_REQUEST:
     case USER_PROFILE_UPDATE_REQUEST
        :
            return{
               loading:true 
            }

            case USER_PROFILE_SUCCESS:
           case USER_PROFILE_UPDATE_SUCCESS:
                return {
                    loading:false,
                userdetails:action.payload

                }
                case USER_PROFILE_FAIL:
               case USER_PROFILE_UPDATE_FAIL:
                    return{
                        loading:false,
                        error:action.payload
                    }
            default:
                return  state
    }

}