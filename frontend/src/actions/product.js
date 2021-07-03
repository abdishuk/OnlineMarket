import {GET_PRODUCTS,PRODUCT_TOP_REQUEST,PRODUCT_TOP_FAIL,PRODUCT_TOP_SUCCESS,PRODUCT_ERROR,PRODUCT_CREATE_REVIEW_REQUEST,PRODUCT_CREATE_REVIEW_FAIL,PRODUCT_CREATE_REVIEW_SUCCESS,GET_PRODUCT, PRODUCT_UPDATE_REQUEST,PRODUCT_UPDATE_SUCCESS,PRODUCT_UPDATE_FAIL,PRODUCT_UPDATE_RESET,PRODUCT_DELETE_SUCCESS,PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_SUCCESS,PRODUCT_DELETE_FAIL,PRODUCT_DELETE_REQUEST} from './types.js'
import axios from 'axios'


export const GetProducts = (keyword='',pageNumber='') => async (dispatch)=>{
    try { console.log('get products action called')
    const {data}=await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
        dispatch({
            type: GET_PRODUCTS,
            payload:data
          })
    } catch (error) {
        dispatch({
            type:PRODUCT_ERROR,
            payload:{msg:'an error occurred',status:'501'}
        })
    }
    
    
}
export const listTopProducts = () => async (dispatch)=>{
  dispatch({
    type: PRODUCT_TOP_REQUEST,
    
  })
  try { console.log('get products action called')
  
  const {data}=await axios.get('api/products/bot/g')
      dispatch({
          type:  PRODUCT_TOP_SUCCESS,
          payload:data
        })
  } catch (error) {
      dispatch({
          type:PRODUCT_TOP_FAIL,
          payload:'an error occurred'
      })
  }
  
  
}
  
    
  
     
   
  
// get a product by Id
export const GetProductById=id=> async (dispatch)=>{
    try {
        const res=await axios.get(`/api/products/${id}`)
       // console.log('dispatched')
        dispatch({
            type:GET_PRODUCT,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}


// Delete a product by id 

export const deleteProduct=(id)=>async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_DELETE_REQUEST,
      })
  
      const {
        user_Login: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
await axios.delete(`/api/products/${id}`, config)
  
      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
     
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: message,
      })
    }
  }
  // create product by admin
  export const createProduct=()=>async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REQUEST,
      })
  
      const {
        user_Login: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
const{data}=await axios.post(`/api/products`,{}, config)
  
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload:data
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
     
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: message,
      })
    }
  }
  // PRODUCT UPDATE ADMIN
  // create product by admin
  export const updateProduct=(product)=>async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_UPDATE_REQUEST,
      })
  
      const {
        user_Login: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type':'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
const{data}=await axios.put(`/api/products/${product._id}`,product, config)
  
      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload:data
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
     
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload: message,
      })
    }
  }
  
  // 
  // create product REVİEW
  export const reviewProduct=(productId,review)=>async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      })
  
      const {
        user_Login: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type':'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
await axios.post(`/api/products/${productId}/reviews`,review, config)
  
      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
     
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      })
    }
  }
  
  
  

    