import express from 'express'
const router=express.Router()
import {authToken,admin} from '../utils/auth.js'
import{ addOrderItems,updateOrderToDelivered,getorders,getOrderbyId,updateOrderToPaid,getMyorders} from '../controllers/orderController.js'


router.route('/').post(authToken,addOrderItems)
router.route('/:id/pay').put(authToken,updateOrderToPaid)
router.route('/:id').get(authToken,getOrderbyId)
router.route('/myorders').get(authToken,getMyorders)
router.route('/').get(authToken,admin,getorders)
router.route('/:id/deliver').put(authToken,admin,updateOrderToDelivered)



export default router  