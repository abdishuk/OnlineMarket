import User from '../Models/UserModel.js'
import bcrypt from 'bcryptjs'
import asynchandler from 'express-async-handler'

//@desc Get user by id
// @route GET /api/users/:id
// @access private/Admin

const getUserById=asynchandler(async(req,res)=>{
    const user=await User.findById(req.params.id).select('-password')
   
    if(user){
        res.json(user)
    }
    else{
 res.status(404)
 throw new Error('User not found')
    }
})

//@desc delete a user
// @route DELETE /api/users/:id
// @access private/Admin

const deleteUser=asynchandler(async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(user){
             await user.remove()
             res.json({
                 message:'User removed'
             })
    }
    else{
 res.status(404)
 throw new Error('User not found')
    }
})

// @desc admin user update
//route put /api/user/:id
// @access private/admin only
const updateUser=asynchandler(async(req,res)=>{
    // find user
    try {
      const user=await User.findById(req.params.id)
      if(!user){
       return res.status(404).json({msg:'User not found'})
      }
      user.name=req.body.name||user.name
      user.email=req.body.email||user.email
      user.isAdmin=req.body.isAdmin||user.isAdmin
      
      const updateduser = await user.save()
    
      res.json(updateduser)
  
    } catch (error) {
      console.log(error)
      res.status(501).send('server error')
    }
    
  
  })

  // get user profile
  
// @desc Auth user and get token 
//@route POST /api/users/login
// @access Public
// @access Public

const getUserProfile=asynchandler(async(req,res)=>{
  // find user
  console.log('user profile controller called')
  try {
    const user=await User.findOne({_id:req.user._id})
    if(!user){
     return res.status(404).json({msg:'User not found'})
    }
    res.status(201).json({
      _id: user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin
    })
  } catch (error) {
    console.log(error)
    res.status(501).send('server error')
  }
  

})
export{
    deleteUser,
    getUserById,updateUser,
    getUserProfile
}