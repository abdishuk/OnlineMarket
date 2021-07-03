import{USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,USER_DETAILS_FAIL,USER_UPDATE_REQUEST,USER_UPDATE_SUCCESS,USER_UPDATE_FAIL,USER_UPDATE_RESET}from '../actions/types.js'
export const UserDetails=(state={},action)=>{
    
    switch(action.type){
        case USER_DETAILS_REQUEST:
        
            return{
               loading:true 
            }

            case USER_DETAILS_SUCCESS:
                return {
                    loading:false,
                userdetails:action.payload

                }
                case USER_DETAILS_FAIL:
               
                    return{
                        loading:false,
                        error:action.payload
                    }
            default:
                return  state
    }

}
export const userupdateReducer=(state={user:{}},action)=>{
    
    switch(action.type){
        case USER_UPDATE_REQUEST:
        
            return{
               loading:true 
            }

            case USER_UPDATE_SUCCESS
            :
                return {
                    loading:false,
                success:true
                }
                case USER_UPDATE_FAIL:
               
                    return{
                        loading:false,
                        error:action.payload
                    }
                    case USER_UPDATE_RESET:
                        return {
                            user:{}
                        }
            default:
                return  state
    }

}