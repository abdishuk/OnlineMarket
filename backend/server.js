import express from 'express'
import AsyncHandler from 'express-async-handler'
import User from './Models/UserModel.js'
import  dotenv from 'dotenv'
import generateToken from './utils/generateToken.js'
import {authToken,admin} from './utils/auth.js'
import ProductRoute from './routes/ProductRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import UserRoutes from './routes/UserRoutes.js'
 import uploadRoutes from './routes/uploadRoutes.js'
 import path from 'path'
import morgan from 'morgan'
if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev'))
}
import Product from './Models/productModel.js'

const app=express()
app.use(express.json())// to post json data
app.use('/api/orders',orderRoutes)
app.use('/api/products',ProductRoute)
app.use('/api/users',UserRoutes)
app.use('/api/upload',uploadRoutes)

// make uploads folder static
const __dirname=path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}



import connectDB from './config/db.js'
 connectDB()
dotenv.config()


// paypal route
app.get('/api/config/paypal',(req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID)
})


//@desc post register user
//@route api/users
// @access public


app.post('/api/users',async(req,res)=>{
  // console.log(req.body)
  const{name,email,password}=req.body
    
   try {
      const userExists=await User.findOne({email})
    
    if(userExists){
      return res.status(400).json({msg:'user already exists'})
    } 
    const user=new User({
      name,
      email,
      password
    })
   
     await user.save()
     if(user){
      res.status(201).json({
        _id: user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)
      })
     }
   } catch (error) {
       console.log(error)
       res.status(501).send('server error')
   }
   
    
 }

)





// @desc update user and userprofile
// @route /api/users/profile/update
// @access private
app.put('/api/users/profile/update',authToken,async(req,res)=>{
  // find user
  try {
    const user=await User.findOne({_id:req.user._id})
    if(!user){
     return res.status(404).json({msg:'User not found'})
    }
    user.name=req.body.name||user.name
    user.email=req.body.email||user.email
    user.password=req.body.password||user.password
    
    const updateduser = await user.save()
  
    res.json(updateduser)

  } catch (error) {
    console.log(error)
    res.status(501).send('server error')
  }
  

})


// @desc Auth user and get token 
//@route POST /api/users/login
// @access Public
app.post('/api/users/login',async(req,res)=>{
   // console.log(req.body)
   const{email,password}=req.body
     
    try {
       const user=await User.findOne({email})
       //console.log(user)
      if(user &&(await user.matchPassword(password))){
        res.status(201).json({
          _id: user._id,
          name:user.name,
          email:user.email,
          isAdmin:user.isAdmin,
          token:generateToken(user._id)
        })
      } else{
        res.status(401).json({
            error:'invalid password or user'
        })
        
      }
    } catch (error) {
        console.log(error)
        res.status(501).send('server error')
    }
    
     
  }
)
// @desc Get all users
//@route GET api/users
// @access PRİVATE/Admin
// @access Public
app.get('/api/users',authToken,admin,async(req,res)=>{
  // find user
  try {
    const users=await User.find({})
   res.json(users)
  } catch (error) {
    console.log(error)
    res.status(501).send('server error')
  }
  

})


// custom error middleware
app.use((err,req,res,next)=>{
  const statusCode=res.statusCode===200? 500:res.statusCode
  res.status(statusCode)
  res.json({
      message:err.message,
      stack:process.env.NODE_ENV==='production'?null:err.stack,
      
  })
})

const PORT=process.env.PORT ||3000
    app.listen(PORT,console.log('server Running in ' + process.env.NODE_ENV + ' On Port ' + PORT))