import React,{useEffect} from 'react'
import{LinkContainer} from 'react-router-bootstrap'
import{useDispatch,useSelector} from 'react-redux'
import{Table,Button,Row,Col} from 'react-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import Paginate from '../components/Paginate.js'
import{PRODUCT_CREATE_RESET} from '../actions/types.js'
import{GetProducts,deleteProduct,createProduct} from '../actions/product.js'
const ProductListScreen = ({history,match}) => {
    const pageNumber=match.params.pageNumber || 1
    const dispatch=useDispatch()
    const product=useSelector(state=>state.product)
    const{loading,error:getProductError,products,page,pages}=product
    const deleteproduct=useSelector(state=>state.deleteProduct)
    const{loading:loadingDelete,error:errorDelete,success:successDelete}=deleteproduct
    const createproduct=useSelector(state=>state.createProduct)
    const{loading:loadingCreate,error:errorCreate,product:createdProduct,success:successCreate}=createproduct
    const UserLogin=useSelector(state=>state.user_Login)
   const{userInfo}=UserLogin
  
   
    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET})
        if (!userInfo||!userInfo.isAdmin ) {
            history.push('/login')
        }
            if(successCreate){
                history.push(`/admin/product/${createdProduct._id}/edit`)
            } else{
                dispatch(GetProducts('',pageNumber))
            }
    },[dispatch,history,userInfo,successDelete,successCreate,createdProduct,pageNumber])
    const createProductHandler=()=>{
dispatch(createProduct())
    }
    const deleteHandler=(id)=>{
      if(window.confirm('Are you sure you want to delete this user?'))
    dispatch(deleteProduct(id))
    }
    return (
        <>
        
        <Row className='align-items-center'>
              <Col>
              <h1>Products</h1></Col>
              <Col className='text-right'>
                  <Button className='my-3' onClick={createProductHandler}>
                     <i className='fas fa-plus'>Create Products</i> 
                  </Button>
              </Col>
        </Row>
        {
            loadingDelete && <Loader/>

        }
        {
            errorDelete && <Message var='danger' message={errorDelete}/>
        }
        {
            loadingCreate && <Loader/>

        }
        {
            errorCreate && <Message var='danger' message={errorDelete}/>
        }
            {loading? <Loader/>:getProductError? <Message var='danger' message={getProductError}/>:(
                <>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            { products.map((product)=>(
                                <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'><i className='fas fa-edit'></i></Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={()=>{
                                        deleteHandler(product._id)
                                    }}>
                                  <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                   
                </Table>
                <Paginate pages={pages} page={page} isAdmin={true}/>
                </>
            )}
        </>
    )
}

export default ProductListScreen
