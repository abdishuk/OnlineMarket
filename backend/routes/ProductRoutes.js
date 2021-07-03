import express from 'express'
const router=express.Router()
import Product from '../Models/productModel.js'
import asynchandler from 'express-async-handler'
import {authToken,admin} from '../utils/auth.js'

// @desc delete a product by id
//@route GET /api/product/:id
// @access private/admin only

  
router.delete('/:id',authToken,admin,asynchandler(async(req,res)=>{
    const product=await Product.findById(req.params.id)
    if(product){
             await product.remove()
             res.json({
                 message:'product removed'
             })
    }
    else{
 res.status(404)
 throw new Error('product not found')
    }
}))


router.get('/',async(req,res)=>{
    const pageSize=2
    const page=Number(req.query.pageNumber)||1
    const keyword=req.query.keyword ?{
        name:{
          $regex:req.query.keyword,
          $options:'i'  
        }
    }:{

    }
   const count=await Product.countDocuments({...keyword})
        console.log('get all products route called')
        const products=await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1))
        
        res.status(201).json({products,page,pages:Math.ceil(count/pageSize)})
        
      })

     
      // get product by id
      // get /api/products/:id
      router.get('/:id',async(req,res)=>{
        try {
            const product=await Product.findById(req.params.id)
            res.json(product)
            
        } catch (error) {
            
                console.error(error.message);
              res.status(500).send('Server error')
        }
       
    })
// desc create a product
// @route post /api/products
//@access private admin
    router.post('/',authToken,admin,asynchandler(async(req,res)=>{
        const product=new Product({
           name:'sample name' ,
           price:0,
           user:req.user._id,
           image:'/images/sample.jpg',
           brand:'sample brand',
           category:'sample Category',
           countInstock:0,
           numReviews:0,
           description:'sample description'
        })
        const createdProduct=await product.save()
        res.status(201).json(createdProduct)
       
    }))


    // desc update a product
// @route put /api/products/:id
//@access private admin
    router.put('/:id',authToken,admin,asynchandler(async(req,res)=>{
      const{name,price,description,image,brand,category,countInStock}=req.body
    const product=await Product.findById(req.params.id)
    if(product){
     product.name=name||product.name
     product.price=price||product.price
     product.description=description||product.description
     product.image=image||product.image
     product.brand=brand||product.brand
     product.category=category||product.category
     product.countInStock=countInStock||product.countInStock

     const updatedProduct=await product.save()
     res.status(201).json(updatedProduct)
    }
    else{
        res.status(404)
 throw new Error('product not found')
    }
      
       
    }))

    
    // desc Create new Review
// @route post /api/products/:id/reviews
//@access private
router.post('/:id/reviews',authToken,asynchandler(async(req,res)=>{
    const{rating,comment}=req.body
  const product=await Product.findById(req.params.id)
  if(product){
   
   const alreadyReviewed=product.reviews.find(review=>review.user.toString()===req.user._id.toString())
  if(alreadyReviewed){
      res.status(400)
      throw new Error('Product already reviewed')
  }
  const review={
      name:req.user.name,
      rating:Number(rating),
      comment,
      user:req.user._id
  }
  product.reviews.push(review)
  product.numReviews=product.reviews.length
  product.rating=product.reviews.reduce((acc,item)=>item.rating + acc,0)/product.reviews.length
  await product.save()
  res.status(201).json({message:'Review added'})
   res.status(201).json(updatedProduct)
  }
  else{
      res.status(404)
throw new Error('product not found')
  }
    
     
  }))
  //@desc Get top rated product
  // @route Get /api/products/top
  //@access public
  /*router.get('/top',asynchandler(async(req,res)=>{
    const products=await Product.find({}).sort([['updatedAt', 'descending']]).limit(3)
    if(!products){
        res.status(404).json({message:'products not found'})
    }
    res.json(products)
}))*/
// get /api/products/:id
router.get('/bot/g',asynchandler(async(req,res)=>{
    const products=await Product.find({}).sort([['updatedAt', 'descending']]).limit(2)
    if(!products){
        res.status(404).json({message:'products not found'})
    }
    res.json(products)
   
}))


 


export default router