import mongoose from "mongoose";
const adminschema=new mongoose.Schema({
    admin_name:{
        type:String,
        required:true,
    },
    admin_email:{
        type:String,
        required:true,
        // unique:true,
    },
    admin_password:{
        type:String,
        required:true,
    }
    }
    
)
export const Admin=mongoose.model("admins",adminschema);
export default Admin;