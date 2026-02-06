import mongoose from "mongoose";

const userschema=new mongoose.Schema({
    U_name:{
        type:String,
        required:true,
    },
    U_email:{
        type:String,
        required:true,
        // unique:true,
    },
    U_password:{
        type:String,
        required:true,
    }
    }
    
)
const User=mongoose.model("users",userschema);
export default User;

