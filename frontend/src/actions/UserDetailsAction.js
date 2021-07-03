import Axios from 'axios'
import{USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,USER_DETAILS_FAIL}from './types.js'
export const getUserdetails=(id)=>async (dispatch,getState)=>{
    dispatch(
      { type:USER_DETAILS_REQUEST} 
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
        const{data}=await Axios.get(`/api/users/${id}`,config
        )
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}



