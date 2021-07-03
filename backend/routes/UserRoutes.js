import express from 'express'
const router=express.Router()
import {authToken,admin} from '../utils/auth.js'
import User from '../Models/UserModel.js'
import{deleteUser, getUserById,updateUser,getUserProfile} from '../controllers/userController.js'

router.route('/:id').delete(authToken,admin,deleteUser)
router.route('/:id').get(authToken,admin,getUserById)
router.route('/myprofile').get(authToken,getUserProfile)
router.route('/:id').put(authToken,admin,updateUser)
export default router



