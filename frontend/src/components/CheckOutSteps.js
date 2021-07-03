import React from 'react'
import{Nav} from 'react-bootstrap'

function CheckOutSteps({step1,step2,step3,step4}) {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1?(
                    <linkContainer to='/login'>
                        <Nav.Link>Sign In</Nav.Link>
                    </linkContainer>
                ):<Nav.Link disabled>Sign In</Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {step2?(
                    <linkContainer to='/shipping'>
                        <Nav.Link>Shipping</Nav.Link>
                    </linkContainer>
                ):<Nav.Link disabled>Shipping In</Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {step3?(
                    <linkContainer to='/payment'>
                        <Nav.Link>Payment</Nav.Link>
                    </linkContainer>
                ):<Nav.Link disabled>Payment</Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {step4?(
                    <linkContainer to='/placeorder'>
                        <Nav.Link>PlaceOrder</Nav.Link>
                    </linkContainer>
                ):<Nav.Link disabled>PlaceOrder</Nav.Link>}
            </Nav.Item>
        </Nav>
    )
}

export default CheckOutSteps
