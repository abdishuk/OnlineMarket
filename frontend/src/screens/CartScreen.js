import React, {useEffect} from 'react'
import{connect} from 'react-redux'
import{Link} from 'react-router-dom'
import{Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap'
import Message from '../components/Message'
import{addToCart,removeFromCart} from '../actions/cartAction'
import PropTypes from 'prop-types'


export const CartScreen = ({match,addToCart,removeFromCart,cart:{cartItems},location,history}) => {
    console.log(match.params.id)
    const qty=location.search?Number(location.search.split('=')[1])  :1
    useEffect(() => {
      //  console.log('mounted')
    
          addToCart(match.params.id,qty) 
      }, [addToCart,match.params.id,qty]);
  
    
    const removeFromCartHandler=(id)=>{
        removeFromCart(id)    }
    const checkoutHandler=()=>{
       history.push('/login?redirect=shipping')
    }
    return (
        <Row>
           <Col md={8}>
            <h1>ShoppingCart</h1>
            {cartItems.length===0?<Message var='info' message='Your cart is empty'> <Link to='/'>Go Back</Link></Message>:
            <ListGroup variant='flush'>
                {cartItems.map(item=>(
                    <ListGroup.Item key={item.product}>
                        <Row>
                           <Col md={2} >
                               <Image src={item.image} alt={item.name} fluid rounded/>
                           </Col>
                           <Col md={3} >
                               <Link to={`/product/${item.product}`}>{item.name}</Link>
                           </Col>
                           <Col md={2}>
                               ${item.price}
                           </Col>
                           <Col md={2}>
                           <Form.Control as='select' value={item.qty} onChange={(e)=>
                                (addToCart(item.product,Number(e.target.value))) }>
                      {   [...Array(item.countInStock).keys()].map(x=>
                           ( <option key={x+1} value={x+1}>
                            {x+1}
                            </option>)
                        )
}  
                        
                        </Form.Control>
                           </Col>
                           <Col md={2}>
                       <Button type="button" variant='light' onClick={()=>removeFromCartHandler(item.product)}><i className='fas fa-trash'></i>Remove From Cart</Button>
                           </Col>
                        </Row>

                    </ListGroup.Item>
                ))}
            </ListGroup>
            }
           </Col>
           <Col md={4}>
                <Card>
                   <ListGroup variant='flush'>
                       <ListGroup.Item>
                           <h2>Subtotal({cartItems.reduce((acc,item)=>acc+=item.qty,0)}) Items</h2>
                           ${cartItems.reduce((acc,item)=>acc+=item.qty*item.price,0).toFixed(2)}
                       </ListGroup.Item>
                       <Button type="button" className='btn btn-block' disabled={cartItems.length===0} onClick={checkoutHandler}>Proceed To Checkout</Button>
                       </ListGroup> 
                </Card>
           </Col>
          
        </Row>
    )
}

const mapstateToProps=state=>({
    cart:state.cart
  })
  CartScreen.propTypes = {
    addToCart:PropTypes.func.isRequired,
    removeFromCart:PropTypes.func.isRequired,
     cart:PropTypes.object.isRequired,
    }
export default connect(mapstateToProps,{addToCart,removeFromCart})(CartScreen)
