import mongoose from 'mongoose'

const connectDB=async ()=>{
    try {
        const conn=await mongoose.connect('mongodb+srv://abdishukri:shukri2014@cluster0.xb6pe.mongodb.net/Onlineshop?retryWrites=true&w=majority',{
            useUnifiedTopology:true,
            useNewUrlParser: true,
            useCreateIndex:true
        })
        console.log('Mobgodb connected on '+ conn.connection.host)
    } catch (error) {
        console.error('Error: '+ error.message)
        process.exit(1)
    }
}
export default connectDB
