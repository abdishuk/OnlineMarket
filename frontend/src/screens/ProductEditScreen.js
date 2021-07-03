import{GetProductById,updateProduct} from '../actions/product.js'
import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import{useDispatch,useSelector} from 'react-redux'
import{Form,Button} from 'react-bootstrap'
import Message from '../components/Message.js'
import{PRODUCT_UPDATE_RESET} from '../actions/types.js'
import Loader from '../components/Loader.js'
import FormContainer from '../components/FormContainer.js'
import axios from 'axios'
function ProductEditScreen({match,history}) {
    const[uploading,setUploading]=useState(false)
    const productDetails=useSelector(state=>state.product)
   const{product,loading,error}=productDetails
   const productUpdate=useSelector(state=>state.productUpdate)
   const{success:successUpdate,loading:loadingUpdate,error:errorUpdate}=productUpdate
   
    const productId=match.params.id
    const dispatch=useDispatch()

    const [formdata,setFormData]=useState({
        name:'',
        price:'', 
        image:'',
        brand:'',
        category:'',
        countInStock:'',
        description:'',

    })
    const{ name,
        price, 
        image,
        brand,
        category,
        countInStock,
        description}=formdata
    useEffect(()=>{
        if(successUpdate){
  dispatch({type:PRODUCT_UPDATE_RESET})
  history.push('/admin/productlist')
        }
        else{
            if(!product.name ||product._id!==productId){
                dispatch(GetProductById(productId))
               
            } else{
                setFormData({
                    name:product.name,
                    price:product.price, 
                    image:product.image,
                    brand:product.brand,
                    category:product.category,
                    countInStock:product.countInStock,
                    description:product.description,
                })
            }
        }
          
        }
       
    ,[dispatch,productId,product,successUpdate])
       
    
    const onChange=(e)=>{
        setFormData({...formdata,
            [e.target.name]:e.target.value
        })
    }
   
    const UploadFilehandler=async(e)=>{
        const file=e.target.files[0]
        const imgdata=new FormData()
        imgdata.append('image',file)
        setUploading(true)
        try{
            const config={
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }
            const{data}=await axios.post('/api/upload',imgdata,config)
            setFormData({...formdata,
               image:data
            })
            setUploading(false)
        
        }
        catch(error){
        console.error(error)
        setUploading(false)
        }
    } 
    const onsubmitHandler= (e)=>{
        e.preventDefault()
        console.log('update button clicked')
        // update product
        dispatch(updateProduct(
            {
                _id:productId,
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock
            }
        ))
}
   
    

    return (
        <>
        <Link to='/admin/productlist' className='btn btn-light my-3'>
            Go Back
        </Link>
        <FormContainer>
            <h1>Product Edit</h1>
            {
                loadingUpdate && <Loader/>
            }
            {
                errorUpdate && <Message var='danger' message={errorUpdate}/>
            }
            {loading?<Loader/>:error?<Message var='danger' message={error}/>:(
     <Form  onSubmit={onsubmitHandler}
     >
         <Form.Group controlId="name" 
    >
<Form.Label>Name</Form.Label>
<Form.Control type="text" placeholder="Enter Name" name='name' value={name} onChange={onChange}/>

</Form.Group>
<Form.Group controlId="Price" 
    >
<Form.Label>Price</Form.Label>
<Form.Control type="number" placeholder="Enter price" name='price' value={price} onChange={onChange}/>
</Form.Group>

<Form.Group controlId="Image" 
    >
<Form.Label>image</Form.Label>
<Form.Control type="text" placeholder="Enter Image URL" name='image' value={image} onChange={onChange}/>
</Form.Group>
<Form.File id='image-file' label='choose file' custom onChange={UploadFilehandler}>

</Form.File>
{
    uploading && <Loader/>
}
<Form.Group controlId="brand" 
    >
<Form.Label>Brand</Form.Label>
<Form.Control type="text" placeholder="Enter brand " name='brand' value={brand} onChange={onChange}/>
</Form.Group>
<Form.Group controlId="countInStock" 
    >
<Form.Label>countInStock</Form.Label>
<Form.Control type="number" placeholder="Enter countInStock" name='countInStock' value={countInStock} onChange={onChange}/>
</Form.Group>
<Form.Group controlId="category" 
    >
<Form.Label>Category</Form.Label>
<Form.Control type="text" placeholder="Enter category " name='category' value={category} onChange={onChange}/>
</Form.Group>
<Form.Group controlId="description" 
    >
<Form.Label>Description</Form.Label>
<Form.Control type="text" placeholder="Enter description " name='description' value={description} onChange={onChange}/>
</Form.Group>
<Button variant="primary" type="submit">
Update  </Button>
</Form>
            )}
            
            
            


           
        </FormContainer>
        </>
        
    )
}

export default ProductEditScreen
