import{USER_LIST_REQUEST,USER_LIST_SUCCESS,USER_LIST_FAIL,USER_DELETE_REQUEST,USER_DELETE_FAIL,USER_DETAILS_SUCCESS,USER_DELETE_SUCCESS,USER_UPDATE_SUCCESS,USER_UPDATE_FAIL,USER_UPDATE_REQUEST} from  './types'
import Axios from 'axios'
export const listUsers=()=>async (dispatch,getState)=>{
    dispatch(
      { type:USER_LIST_REQUEST} 
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
        const{data}=await Axios.get(`/api/users`,config
        )
        console.log(data)
        dispatch({
            type:USER_LIST_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:USER_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}


export const deleteUser=(id)=>async (dispatch,getState)=>{
    dispatch(
      { type:USER_DELETE_REQUEST} 
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
       await Axios.delete(`/api/users/${id}`,config
        )
        dispatch({
            type:USER_DELETE_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type:USER_DELETE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}

export const updateuser=(user)=>async (dispatch,getState)=>{
    dispatch(
      { type:USER_UPDATE_REQUEST} 
    )

    try {
        const {
            user_Login: { userInfo },
          } = getState()
      
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
      
          const { data } = await Axios.put(`/api/users/${user._id}`, user, config)        
        dispatch({
            type:USER_UPDATE_SUCCESS,
        })
        dispatch({
            type:USER_DETAILS_SUCCESS,payload:data
        })
        
    } catch (error) {
        dispatch({
            type:USER_UPDATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}