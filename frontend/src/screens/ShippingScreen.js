import React,{useState} from 'react'
import{useDispatch,useSelector} from 'react-redux'
import{Form,Button} from 'react-bootstrap'
import {saveShippingAddress} from '../actions/cartAction.js'
import FormContainer from '../components/FormContainer.js'
import CheckOutSteps from '../components/CheckOutSteps.js'
function ShippingScreen({history}) {
  const cart= useSelector(state => state.cart)
  const{shippingAddress}=cart
    const[address,setAddress]=useState(shippingAddress.address)
    const[city,setcity]=useState(shippingAddress.city)
    const[postalCode,setPostalcode]=useState(shippingAddress.postalCode)
    const[country,setcountry]=useState(shippingAddress.country)
    
      const dispatch=useDispatch()
    const onsubmitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payment')

    }

    return (
        <FormContainer>
          <CheckOutSteps step1 step2/>
           <h1>Shipping</h1> 
           <Form onSubmit={onsubmitHandler}>
           <Form.Group controlId="address">
    <Form.Label>Address</Form.Label>
    <Form.Control type='text' placeholder="enter address" name='address' value={address} onChange={(e)=>setAddress(e.target.value)} required/>
  </Form.Group>
  <Form.Group controlId="city">
    <Form.Label>city</Form.Label>
    <Form.Control type='text' placeholder="enter city" name='city' value={city} onChange={(e)=>setcity(e.target.value)}  required/>
  </Form.Group>
  <Form.Group controlId="postalcode">
    <Form.Label>postalcode</Form.Label>
    <Form.Control type='text' placeholder="enter postalcode" name='postalcode' value={postalCode} onChange={(e)=>setPostalcode(e.target.value)}  required/>
  </Form.Group>
  <Form.Group controlId="country">
    <Form.Label>country</Form.Label>
    <Form.Control type='text' placeholder="enter country" name='country' value={country} onChange={(e)=>setcountry(e.target.value)}  required/>
  </Form.Group>
  <Button type='submit' variant='primary'>Continue</Button>

           </Form>
        </FormContainer>
    )
}

export default ShippingScreen
