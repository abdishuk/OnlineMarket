import bcrypt from 'bcryptjs'
const users=[{
   name:'Admin User',
   email:'admin@example.com',
   password:bcrypt.hashSync('123456',10),
   isAdmin:true

},
{
    name:'Abdishukri Yussuf',
    email:'yussuf@example.com',
    password:bcrypt.hashSync('123456',10),
    isAdmin:true

},
{
    name:'Khalid',
    email:'khalid@example.com',
    password:bcrypt.hashSync('123456',10),
    isAdmin:true

}

]
export default users