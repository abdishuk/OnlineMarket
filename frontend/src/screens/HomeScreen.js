import React,{useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import {GetProducts} from '../actions/product.js'
import{connect} from 'react-redux'
import PropTypes from 'prop-types'
import Product from '../components/Product.js'
import{Helmet} from 'react-helmet'
import Loader from '../components/Loader.js'
import Alert from '../components/Message.js'
import Paginate from '../components/Paginate.js'
import ProductCarousel from '../components/Carousel.js'
import Meta from '../components/Meta.js'
import {Link} from 'react-router-dom'



const HomeScreen = ({match,GetProducts,product:{products,loading,error,page,pages}}) => {
    const keyword=match.params.keyword
    const pageNumber=match.params.pageNumber||1

    useEffect(() => {
        GetProducts(keyword,pageNumber)
      }, [GetProducts,keyword,pageNumber]);
    
    return (
        <>
        <Meta/>
          
        {
          !keyword ? pageNumber===1 && <ProductCarousel />:<Link to='/home' className='btn btn-light'>Go back</Link>
        }
                    <h1>Latest Products</h1>
                    {
                        loading?  <Loader/>:error?<Alert var='danger' message={error.message ?error.message:'An error occured'}/>:             
                        (<>
                        <Row>
                        
                             {products.map(product=>(
                                <Col sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} key={product._id}/>
                                </Col>
                               ))}  
                           
                        </Row>
                        <Paginate pages={pages} page={page} keyword={keyword ? keyword:''}/>
                        </>)
}
                        
       
</>       
    )
    
}
const mapstateToProps=state=>({
  product:state.product
})
HomeScreen.propTypes = {
    GetProducts:PropTypes.func.isRequired,
    product:PropTypes.object.isRequired,
  }
export default connect(mapstateToProps,{GetProducts})(HomeScreen)
