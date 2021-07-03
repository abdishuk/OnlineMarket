import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import{useDispatch,useSelector} from 'react-redux'
import{Form,Button,Row,Col} from 'react-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import{login} from '../actions/login_action.js'
import FormContainer from '../components/FormContainer.js'
function LoginScreen({location,history}) {
    const [formdata,setFormData]=useState({
        email:'',
        password:''
    })
   
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const user_Login = useSelector(state => state.user_Login)
    const{loading,error,userInfo}=user_Login
    useEffect(()=>{
       if(userInfo ){
       history.push(redirect)
        }
    },[history,userInfo,redirect])
    
    const dispatch=useDispatch()
    const onChange=(e)=>{
        setFormData({...formdata,
            [e.target.name]:e.target.value
        })
    }
    const{email,password}=formdata
    const onsubmitHandler= (e)=>{
        e.preventDefault()
        const{email,password}=formdata
dispatch(login(email,password))
}
   
    

    return (
        <FormContainer>
            <h1>Sign in</h1>
            {error &&<Message var='danger' message={error}/>}
            {loading && <Loader/>}
            
            <Form  onSubmit={onsubmitHandler}
         >
  <Form.Group controlId="formBasicEmail" 
        >
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={onChange}/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={onChange}/>
  </Form.Group>
  <Button variant="primary" type="submit">
    Sign In
  </Button>
</Form>


            <Row className='py-3'>
                <Col>
    New Customer?{'  '}
    <Link to={redirect?`/register/redirect=${redirect}`:'/register'}>Register</Link>
    </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
