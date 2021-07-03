import React from 'react';
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import{Container}from 'react-bootstrap'
import{BrowserRouter as Router,Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen.js'
import RegisterScreen from './screens/RegisterScreen.js'
import ShippingScreen from './screens/ShippingScreen.js'
import PaymentScreen from  './screens/PaymentScreen.js'
import PlaceOrderScreen from './screens/PlaceOrder.js'
import OrderScreen from './screens/OrderScreen.js'
import profileScreen from './screens/profileScreen.js'
import USERLISTSCREEN from './screens/UserListScreen.js'
import UserEditScreen from './screens/UserEditScreen.js'
import ProductListScreen from './screens/ProductListScreen.js'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen.js'

const App=()=> {
  return (
       <Router>
    <Header/>
    <main className='py-3'>
      <Container>
      <Route  path='/shipping' component={ShippingScreen}/>
        <Route exact path='/' component={HomeScreen}/>
        <Route exact path='/search/:keyword' component={HomeScreen}/>
        <Route exact path='/page/:pageNumber' component={HomeScreen}/>
        <Route exact path='/search/:keyword/page/:pageNumber' component={HomeScreen}/>
        <Route  path='/order/:id' component={OrderScreen}/>
        <Route  path='/product/:id' component={ProductScreen}/>
        <Route  path='/cart/:id?' component={CartScreen}/>
        <Route  path='/login' component={LoginScreen}/>
        <Route  path='/placeorder' component={PlaceOrderScreen}/>
        <Route  path='/payment ' component={PaymentScreen}/>
        <Route  path='/profile' component={profileScreen}/>
        <Route  path='/admin/userList' component={USERLISTSCREEN} exact/>
        <Route  path='/admin/productlist/:pageNumber' component={ProductListScreen} exact/>
        <Route  path='/admin/productlist' component={ProductListScreen} exact/>
        <Route  path='/register' component={RegisterScreen}/>
        <Route  path='/admin/user/:id/edit' component={UserEditScreen}/>
        <Route path='/admin/product/:id/edit' component={ProductEditScreen}/>
        <Route path='/admin/orderlist' component={OrderListScreen}/>

      </Container>
   
    </main>
    <Footer/>
    </Router>
   
   
  );
}

export default App;
