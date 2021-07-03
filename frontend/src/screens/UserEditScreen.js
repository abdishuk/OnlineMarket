import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import{useDispatch,useSelector} from 'react-redux'
import{Form,Button} from 'react-bootstrap'
import Message from '../components/Message.js'
import{USER_UPDATE_RESET} from '../actions/types.js'
import Loader from '../components/Loader.js'
import{getUserdetails} from '../actions/UserDetailsAction.js'
import{updateuser} from '../actions/userActions.js'
import FormContainer from '../components/FormContainer.js'
function UserEditScreen({match,history}) {
    const UserDetails=useSelector(state=>state.UserDetails)
   const{userdetails,loading,error}=UserDetails
   const userUpdate=useSelector(state=>state.userUpdate)
   const{success:successUpdate,loading:loadingUpdtate,error:errorUpdate}=userUpdate
    const userId=match.params.id
    const [formdata,setFormData]=useState({
        name:'',
        email:'', 
    })
    const dispatch=useDispatch()
    const[isAdmin,setIsAdmin]=useState(false)
    useEffect(()=>{
        if(successUpdate){
            dispatch({
                type:USER_UPDATE_RESET
            })
            history.push('/admin/userList')
        }
        else{
            if(!userdetails ||userdetails._id!==userId){
                dispatch(getUserdetails(userId))
            } else{
                setFormData({
                    name:userdetails.name,
                    email:userdetails.email
                })
                setIsAdmin(UserDetails.isAdmin)
            }
        }
       
    },[userdetails,successUpdate,history,UserDetails.isAdmin, dispatch, userId])
       
    
   
    const onChange=(e)=>{
        setFormData({...formdata,
            [e.target.name]:e.target.value
        })
    }
    const{name,email}=formdata
    const onsubmitHandler= (e)=>{
        e.preventDefault()
        console.log('update button clicked')
        dispatch(updateuser({
            _id:userId,
            name,email,
            isAdmin
        }))
        
}
   
    

    return (
        <>
        <Link to='/admin/userList' className='btn btn-light my-3'>
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit User</h1>
            {
                loadingUpdtate && <Loader/>
            }
            {
                errorUpdate && <Message var='danger' message={errorUpdate}/>
            }
            {loading?<Loader/>:error?<Message var='danger' message={error}/>:(
     <Form  onSubmit={onsubmitHandler}
     >
         <Form.Group controlId="name" 
    >
<Form.Label>Name</Form.Label>
<Form.Control type="text" placeholder="Enter email" name='name' value={name} onChange={onChange}/>
<Form.Text className="text-muted">
 Enter your official names
</Form.Text>
</Form.Group>
<Form.Group controlId="formBasicEmail" 
    >
<Form.Label>Email address</Form.Label>
<Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={onChange}/>
<Form.Text className="text-muted">
  We'll never share your email with anyone else.
</Form.Text>
</Form.Group>

<Form.Group controlId="isadmin">
<Form.Check type="checkbox" label="isAdmin" name='isAdmin' checked={isAdmin}  onChange={(e)=>setIsAdmin(e.target.checked)}/>
</Form.Group>

<Button variant="primary" type="submit">
Update  </Button>
</Form>
            )}
            
            
            


           
        </FormContainer>
        </>
        
    )
}

export default UserEditScreen
