import { combineReducers } from 'redux';
import {product,deleteproduct,productCreateReducer,productUPDATEReducer,productreviewCreateReducer,producttopRatedReducer} from './product.js'
import cartReducer from './CartReducer'
import {loginReducer} from './Login_reducer'
import{RegisterReducer} from '../reducers/Register_Reducer.js'
import{userProfile} from '../reducers/UserProfileReducer.js'
import{userListReducer} from '../reducers/UserListReducer.js'
import{userDeleteReducer} from '../reducers/UserdeleteReducer.js'
import {orderCreateReducer,
  orderDetailsReducer,orderPayReducer,ORDERListMyReducer,ORDERListReducer,orderDeliverReducer} from './OrderCreateReducers.js'

  import{UserDetails,userupdateReducer} from '../reducers/getUserDetailsReducer.js'
  

export default combineReducers({
  userList:userListReducer,
  userprofile:userProfile,
  product,
  userRegister:RegisterReducer,
  orderCreate:orderCreateReducer,
 cart: cartReducer,
 user_Login:loginReducer,
 orderDetails:orderDetailsReducer,
 Pay:orderPayReducer,
 orderList:ORDERListMyReducer,
 Userdelete:userDeleteReducer,
 userUpdate:userupdateReducer,
 UserDetails,
 deleteProduct:deleteproduct,
createProduct:productCreateReducer,
productUpdate:productUPDATEReducer,
Orders:ORDERListReducer,
orderDeliver:orderDeliverReducer,
productReviewCreate:productreviewCreateReducer,
productTopRated:producttopRatedReducer

  
});