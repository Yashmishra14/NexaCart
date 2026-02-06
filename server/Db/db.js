import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const connection =() =>{mongoose.connect(process.env.DB_URL)}
connection();


mongoose.connection.on('connected',()=>{
    console.log("Database connected successfully");

})
mongoose.connection.on('error',(err)=>{
    console.log("Database connection failed",err);
})

export default mongoose;
