import React,{useEffect} from 'react'
import{LinkContainer} from 'react-router-bootstrap'
import{useDispatch,useSelector} from 'react-redux'
import{Table,Button} from 'react-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import{listOrders} from '../actions/orderActions.js'
const OrderListScreen = ({history}) => {
    const dispatch=useDispatch()
    const orderList=useSelector(state=>state.Orders)
    const{loading,error,orders}=orderList
    const UserLogin=useSelector(state=>state.user_Login)
   const{userInfo}=UserLogin
   
   
    useEffect(()=>{
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
          } else {
            history.push('/login')
          }
    },[dispatch,history,userInfo])
   
    return (
        <>
        <h1>Orders</h1>
            {loading? <Loader/>:error? <Message var='danger' message={error}/>:(
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                        </tr>
                        </thead>
                        <tbody>
                            { orders.map((order)=>(
                                <tr key={order._id}>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid? (
                                    order.paidAt.substring(0,10)
                                ):(<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                                <td>{order.isDelivered? (
                                    order.deliveredAt.substring(0,10)
                                ):(<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'><i className='fas fa-edit'></i></Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' >
                                       Details
                                    </Button>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                   
                </Table>
            )}
        </>
    )
}

export default OrderListScreen
