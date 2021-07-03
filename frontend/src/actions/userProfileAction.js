import Axios from 'axios'
import{ USER_PROFILE_REQUEST,USER_PROFILE_SUCCESS,USER_PROFILE_FAIL,USER_PROFILE_UPDATE_REQUEST,USER_PROFILE_UPDATE_SUCCESS,USER_PROFILE_UPDATE_FAIL} from './types.js'
export const getUserProfile=()=>async (dispatch,getState)=>{
    console.log('get user profile called')
    dispatch(
      { type:USER_PROFILE_REQUEST} 
    )

    try {
        const{
            user_Login:{userInfo}
        }=getState()
        
        const config={
            
            headers:{
              Authorization:`Bearer ${userInfo.token}`,

            },
          }
        const{data}=await Axios.get(`/api/users/myprofile`,config
        )
        dispatch({
            type:USER_PROFILE_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:USER_PROFILE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}


export const updateUserProfie=(newprofile)=>async (dispatch,getState)=>{
    dispatch(
      { type:USER_PROFILE_UPDATE_REQUEST} 
    )

    try {
        const{
            user_Login:{userInfo}
        }=getState()
        
        const config={
            
            headers:{
              Authorization:`Bearer ${userInfo.token}`,

            },
          }
        const{data}=await Axios.put(`/api/users/profile/update`,newprofile,config
        )
        dispatch({
            type:USER_PROFILE_UPDATE_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:USER_PROFILE_UPDATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}