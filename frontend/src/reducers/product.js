import{PRODUCT_CREATE_REVIEW_REQUEST,PRODUCT_TOP_SUCCESS,PRODUCT_TOP_REQUEST,PRODUCT_TOP_FAIL,PRODUCT_CREATE_REVIEW_RESET,PRODUCT_CREATE_REVIEW_FAIL,PRODUCT_CREATE_REVIEW_SUCCESS,
    GET_PRODUCTS,PRODUCT_ERROR,PRODUCT_UPDATE_RESET, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_RESET,GET_PRODUCT, PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_SUCCESS,PRODUCT_DELETE_FAIL,PRODUCT_UPDATE_SUCCESS,PRODUCT_UPDATE_REQUEST,PRODUCT_UPDATE_FAIL
} from '../actions/types'
const initialstate={
    products:[],
    product:{},
    loading:true,
    error:{}
}

export const product=(state=initialstate,action)=>{
    const{type,payload}=action
    switch(type){
      case  GET_PRODUCTS:
          return{
              ...state,
              products:payload.products,
              pages:payload.pages,
              page:payload.page,
              loading:false,
              error:null
          }

          case  GET_PRODUCT:
          return{
              ...state,
              product:payload,
              products:[],
              error:null,
              loading:false
          }

          case PRODUCT_ERROR:
              return {
                  ...state,
                  error:payload,
                  loading:false
              }
          default:return state

    }
}
export const deleteproduct=(state={},action)=>{
    const{type,payload}=action
    switch(type){
      case  PRODUCT_DELETE_REQUEST:
          return{
             loading:true
          }

          case  PRODUCT_DELETE_SUCCESS:
          return{
              success:true,
              loading:false
          }

          case  PRODUCT_DELETE_FAIL:
              return {
                  ...state,
                  error:payload,
                  loading:false
              }
          default:return state

    }
}


// PRODUCT CREATE REDUCT 
export const productCreateReducer=(state={},action)=>{
    const{type,payload}=action
    switch(type){
      case  PRODUCT_CREATE_REQUEST:
          return{
             loading:true
          }

          case  PRODUCT_CREATE_SUCCESS:
          return{
              success:true,
              loading:false,
              product:action.payload
          }

          case  PRODUCT_CREATE_FAIL:
              return {
                  ...state,
                  error:payload,
                  loading:false
              }
              case  PRODUCT_CREATE_RESET:
                  return {}
          default:return state

    }
}


export const productUPDATEReducer=(state={product:{}},action)=>{
    const{type,payload}=action
    switch(type){
      case  PRODUCT_UPDATE_REQUEST:
          return{
             loading:true
          }

          case  PRODUCT_UPDATE_SUCCESS:
          return{
              success:true,
              loading:false,
              product:action.payload
          }

          case  PRODUCT_UPDATE_FAIL:
              return {
                  ...state,
                  error:payload,
                  loading:false
              }
              case  PRODUCT_UPDATE_RESET:
                  return {}
          default:return state

    }
}


export const productreviewCreateReducer=(state={},action)=>{
    const{type,payload}=action
    switch(type){
      case  PRODUCT_CREATE_REVIEW_REQUEST:
          return{
             loading:true
          }

          case  PRODUCT_CREATE_REVIEW_SUCCESS:
          return{
              success:true,
              loading:false,
              
          }

          case  PRODUCT_CREATE_REVIEW_FAIL:
              return {
                  ...state,
                  error:payload,
                  loading:false
              }
              case  PRODUCT_CREATE_REVIEW_RESET:
                  return {}
          default:return state

    }
}

export const producttopRatedReducer=(state={products:[]},action)=>{
    const{type,payload}=action
    switch(type){
      case  PRODUCT_TOP_REQUEST:
          return{
             loading:true,
             products:[]
          }

          case  PRODUCT_TOP_SUCCESS:
          return{
              products:action.payload,
              loading:false,
              
          }

          case  PRODUCT_TOP_FAIL:
              return {
                  ...state,
                  error:payload,
                  loading:false
              }
              
          default:return state

    }
}