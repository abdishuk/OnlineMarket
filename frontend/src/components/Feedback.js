import React from 'react'
import { Alert } from 'react-bootstrap'

const FeedBack = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>
}

export default FeedBack