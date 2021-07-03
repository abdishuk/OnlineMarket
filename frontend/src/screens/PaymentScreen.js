import React,{useState} from 'react'
import{useDispatch,useSelector} from 'react-redux'
import{Form,Button,Col} from 'react-bootstrap'
import {savePaymentMethod} from '../actions/cartAction.js'
import FormContainer from '../components/FormContainer.js'
import CheckOutSteps from '../components/CheckOutSteps.js'
function PaymentScreen({history}) {
  const cart= useSelector(state => state.cart)
  const{shippingAddress}=cart
  if(!shippingAddress){
      history.push('/shipping')
  }
    const[paymentMethod,setpaymentMethod]=useState('Paypal')
   
    
      const dispatch=useDispatch()
    const onsubmitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')

    }

    return (
        <FormContainer>
          <CheckOutSteps step1 step2 step3/>
           <h1>PaymentMethod</h1> 
           <Form onSubmit={onsubmitHandler}>
           <Form.Group>
              <Form.Label as='legend'>Select Method</Form.Label> 
        
           <Col>
           <Form.Check type='radio' label='PayPal' name='paymentMethod' value='Paypal' id='PayPal'  onChange={e=>setpaymentMethod(e.target.value)}></Form.Check>
           <Form.Check type='radio' label='Credit Card' name='paymentMethod' value='Credit Card' id='Credit'  onChange={e=>setpaymentMethod(e.target.value)}></Form.Check>
           <Form.Check type='radio' label='Cash On delivery' name='paymentMethod' value='Cash' id='Cash'  onChange={e=>setpaymentMethod(e.target.value)}></Form.Check>

           </Col>
           </Form.Group>
  <Button type='submit' variant='primary'>Continue</Button>

           </Form>
        </FormContainer>
    )
}

export default PaymentScreen
