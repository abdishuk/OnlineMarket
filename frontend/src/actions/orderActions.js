import{ORDER_DELIVER_REQUEST,ORDER_DELIVER_SUCCESS,ORDER_DELIVER_FAIL,ORDER_CREATE_REQUEST,ORDER_LIST_MY_REQUEST,ORDER_LIST_MY_FAIL,ORDER_LIST_MY_SUCCESS,ORDER_CREATE_SUCCESS,ORDER_CREATE_FAIL,ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_FAIL,ORDER_PAY_REQUEST,ORDER_PAY_FAIL,ORDER_PAY_SUCCESS,ORDER_LIST_REQUEST,ORDER_LIST_FAIL,ORDER_LIST_SUCCESS} from './types.js'
import axios from 'axios'
import {logout} from '../actions/login_action.js'

export const CreateOrder=(order)=>async(dispatch,getState)=>{
    try {
        console.log('create order called')
        dispatch({
            type:ORDER_CREATE_REQUEST
        })
        const{
            user_Login:{userInfo}
        }=getState()
        
        const config={
            headers:{
              'Content-Type':'application/json',
              Authorization:`Bearer ${userInfo.token}`,

            },
          }
      const{data}=await axios.post('/api/orders',order,config)
      dispatch({
        type:ORDER_CREATE_SUCCESS,
        payload:data
    })
   
    } catch (error) {
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}


export const getOrderDetails=(id)=>async(dispatch,getState)=>{
    console.log('get orderdeatils action called')
    try {
        
        dispatch({
            type:ORDER_DETAILS_REQUEST
        })
        const{
            user_Login:{userInfo}
        }=getState()
        
        const config={
            headers:{
              Authorization:`Bearer ${userInfo.token}`,

            },
          }
      const{data}=await axios.get(`/api/orders/${id}`,config)
      dispatch({
        type:ORDER_DETAILS_SUCCESS,
        payload:data
    })
   
    } catch (error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}
export const payorder=(id,paymentResult)=>async(dispatch,getState)=>{
    try {
        
        dispatch({
            type:ORDER_PAY_REQUEST,
           
        })
        const{
            user_Login:{userInfo}
        }=getState()
        
        const config={
            'Content-Type':'application/json',
            headers:{
              Authorization:`Bearer ${userInfo.token}`,

            },
          }
      const{data}=await axios.put(`/api/orders/${id}/pay`,paymentResult,config)
      dispatch({
        type:ORDER_PAY_SUCCESS,
        payload:data
    })
   
    } catch (error) {
        dispatch({
            type:ORDER_PAY_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}

export const deliverorder=(id)=>async(dispatch,getState)=>{
  try {
      
      dispatch({
          type:ORDER_DELIVER_REQUEST,
         
      })
      const{
          user_Login:{userInfo}
      }=getState()
      
      const config={
          
          headers:{
            Authorization:`Bearer ${userInfo.token}`,

          },
        }
    const{data}=await axios.put(`/api/orders/${id}/deliver`,config)
    dispatch({
      type:ORDER_DELIVER_SUCCESS,
  payload:data
  })
 
  } catch (error) {
      dispatch({
          type:ORDER_DELIVER_FAIL,
          payload:error.response && error.response.data.message ? error.response.data.message:error.message
      })
  }
}

export const listMyORDER=()=>async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_MY_REQUEST,
      })
  
      const {
        user_Login: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/orders/myorders`, config)
  
      dispatch({
        type: ORDER_LIST_MY_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: ORDER_LIST_MY_FAIL,
        payload: message,
      })
    }
  }
  

  
export const listOrders=()=>async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST
      ,
    })

    const {
      user_Login: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders`, config)

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    })
  }
}
