import React from 'react'
import{Navbar,Nav,Container, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import{logout} from '../actions/login_action.js'
import{ useDispatch,useSelector} from 'react-redux'
import SearchBox from './SearchBox.js'
import{Route} from 'react-router-dom'
import './Header.css'

const Header = () => {
  const userLogin=useSelector(state=>state.user_Login)
  const{userInfo}=userLogin
  const dispatch= useDispatch()
  const logoutHandler=()=>{
    dispatch(logout())
  }
    return (
        <header className='sticky'>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
  <LinkContainer to='/'><Navbar.Brand >Online Market</Navbar.Brand></LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Route render={({history})=><SearchBox history={history}/>}/>
    <Nav className="ml-auto">
    
      <LinkContainer  to="/cart"><Nav.Link><i className='fas fa-shopping-car'></i>Cart</Nav.Link></LinkContainer>
      {
       userInfo?(
         <NavDropdown title={userInfo.name} id='username'> 
        <LinkContainer to='/profile'>
          <NavDropdown.Item>
            Profile
          </NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Item onClick={logoutHandler}>
         Logout
        </NavDropdown.Item>
         </NavDropdown>
       ):<LinkContainer  to="/login"> 
      
       <Nav.Link  ><i className='fas fa-user'></i>Sign In</Nav.Link>
           
           
           </LinkContainer>
     }
      
      {userInfo && userInfo.isAdmin &&(
        <NavDropdown title='Admin' id='adminment'> 
        <LinkContainer to='/admin/userList'>
          <NavDropdown.Item>
            Users
          </NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/admin/productlist'>
          <NavDropdown.Item>
            products
          </NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/admin/orderlist'>
          <NavDropdown.Item>
            Orders
          </NavDropdown.Item>
        </LinkContainer>
        
         </NavDropdown>
      )}


    
    </Nav>    
  </Navbar.Collapse>
  </Container>
</Navbar>
        </header>
    )
}

export default Header
