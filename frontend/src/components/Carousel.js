import React,{useEffect} from 'react'
import{useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import{Carousel,Image} from 'react-bootstrap'
import Loader from './Loader.js'
import Message from './Message.js'
import{listTopProducts}from '../actions/product.js'

const ProductCarousel = () => {
   const dispatch = useDispatch()
   const productToprated = useSelector(state => state.productTopRated)
   const{loading,error,products}=productToprated
   useEffect(()=>{
       dispatch(listTopProducts())
   },[dispatch])
   return (<>
    {loading? <Loader/> :error?<Message var='danger' message={error}/>
    :(
        <Carousel pause='hover' className='bg-dark'>
            {products.map(product=><Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}  >
                    <Image src={product.image} alt={product.name} fluid/>
                    <Carousel.Caption className='carousel-caption'>
                        <h2>{product.name}</h2>
                        <h2>{product.price}</h2>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>)}
        </Carousel>
    )}
     </>
   )
  
   
   
}

export default ProductCarousel
