import axios from 'axios'
import{CART_ADD_ITEM,CART_REMOVE_ITEM,CART_SAVE_SHIPPING,CART_SAVE_PaymentMethod} from '../actions/types'
export const addToCart=(id,qty)=> async (dispatch,getState)=>{
const{data}=await axios.get(`/api/products/${id}`)
//console.log(data)
dispatch({
    type:CART_ADD_ITEM,
    payload:{
        product:data._id,
        name:data.name,
        image:data.image,
        price:data.price,
        countInStock:data.countInStock,
        qty
    }
})
localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

// remove from cart
export const removeFromCart=(id)=> async (dispatch,getState)=>{
    //console.log(data)
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:
      id
           
        
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}
    export const saveShippingAddress=(data)=> async (dispatch)=>{
        //console.log(data)
        dispatch({
            type:CART_SAVE_SHIPPING,
            payload:
          data
               
            
        })
        localStorage.setItem('shippingaddress',JSON.stringify(data))
    }
       
    export const savePaymentMethod=(data)=> async (dispatch)=>{
        //console.log(data)
        dispatch({
            type:CART_SAVE_PaymentMethod,
            payload:
          data
               
            
        })
        localStorage.setItem('paymentMethod',JSON.stringify(data))
    }