import React from 'react'
import{useEffect,useState} from 'react'
import {Form,Button,Row,Col,Table} from 'react-bootstrap'
import{LinkContainer} from 'react-router-bootstrap'
import{getUserProfile,updateUserProfie} from '../actions/userProfileAction.js'
import{useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import {listMyORDER} from '../actions/orderActions.js'
 const ProfileScreen = ({history}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword,setConfirmPassword] = useState('')
  const[message,setMessage]=useState(null)
  const dispatch=useDispatch()
   const Userprofile=useSelector(state=>state.userprofile)
   const{userdetails,loading,error}=Userprofile
   const UserLogin=useSelector(state=>state.user_Login)
   const{userInfo}=UserLogin

   const OrderList=useSelector(state=>state.orderList)
   const{orders,loading:loadingOrders,errorOrders}=OrderList
   
   useEffect(()=>{
     if(!userInfo){
       history.push('/login')
     } else{
      if(!userdetails ){
        dispatch(getUserProfile())
        dispatch(listMyORDER())
       }
       else{
         console.log('names are currently set')
        setName(userdetails.name)
        setEmail(userdetails.email)
       }
     }
    
     
   },[dispatch,userdetails,history,userInfo])
   
  
   const UpdateProfileHandler=(e)=>{
     e.preventDefault()
     if(password!==confirmpassword){
       setMessage('passwords dont match')
     }
     dispatch(updateUserProfie({name,email,password}))
   }
    return (
        <>
        <Row>
          <Col md={3}>
          <h1>Your Profile </h1>
          {message && <Message message={message} var='danger'/>}
            {
              loading? <Loader/>:error? <Message var='danger' message={error} />:
              <Form onSubmit={UpdateProfileHandler} 
         >
  <Form.Group controlId="formBasicEmail" 
        >
            <Form.Group controlId="formName">
    <Form.Label>Name</Form.Label>
    <Form.Control type="name" placeholder="Name" value={name} name='name'  onChange={(e) => setName(e.target.value)}/>
  </Form.Group>
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={email} name='email'  onChange={(e)=>setEmail(e.target.value)}  />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" name='password' value={confirmpassword} onChange={(e) => setPassword(e.target.value)}/>
  </Form.Group>
  <Form.Group controlId="formConfirmPassword">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control type="password" placeholder="Confirm Password" name='confirmpassword' value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
  </Form.Group>
  <Button variant="primary " type="submit">
  Update
  </Button>
</Form>
            }
            
          </Col>
          <Col  md={9}>
            <h2>My Orders</h2>
            {loadingOrders? <Loader/>:errorOrders?<Message var='danger' message={errorOrders}/>:(
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                     <th></th>
                    </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.map(order=>(
                      <tr key={order._id}>
                        <td>{order.createdAt.substring(0,10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.isPaid? order.paidAt.substring(0,10):(
                          <i className='fas fa-times' style={{color:'red'}}></i>
                        )}</td>
                        <td>{order.isDelivered? order.DeliveredAt.substring(0,10):(
                          <i className='fas fa-times' style={{color:'red'}}></i>
                        )}</td>
                     <td>
                       <LinkContainer to={`/order/${order._id}`}>
                         <Button className='btn-sm' variant='light'>
                           Details
                         </Button>
                       </LinkContainer>
                     </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
        </>
    )
}
 export default ProfileScreen