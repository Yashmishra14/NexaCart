import { configDotenv } from "dotenv";
configDotenv();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User.js";


export const reguser = async (req, res) => {
  try {
        // console.log("REQ BODY 👉", req.body);

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      U_name: name,
      U_email: email,
      U_password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User registered successfully!",
      user: savedUser,
    });

  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// export const loginuser =async (req,res)=>{
//   try{
//     const {email,password}=req.body;
//      const user = await User.findOne({ U_email: email })
//      if (!user) {
//       res.json({ message1: "User not found" });
      
//      } else {
//       const ispasswordmatch=await bcrypt.compare(password,user.U_password)
//       if(!ispasswordmatch){
//         res.json({ message2: "Invalid password" });
//       }else{
//         const isMatch = await bcrypt.compare(password, user.U_password);
//         // res.json({ message3: "Login successful", user });
//         if (!isMatch){
//           res.json({ message2: "Invalid password" });

//         }else{
//           res.json({ message3: "Login successful", user });

//         }

//       }
      
//      }
//   }catch(err){
//     console.error("Login Error:", err);
//   }
// }

export const Login =async(req,res)=>{
  const email = req.body.lemail;
  const password = req.body.lpassword;

  try{
    const user = await User.findOne({U_email:email});
    if(!user){
      res.json({message1:"User not found"});
    }else{
      const isMatch = await bcrypt.compare(password,user.U_password);

      if (!isMatch) {
        res.json({ message2: "Invalid password" });
      } else {
        const token = jwt.sign(
          {
            id: user._id,
            email: user.U_email,
            role:"user"
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        )
        res.json({ message3: "Login successful", "token":token });
        
      }
    }
  }catch(err){
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export const test=(req,res)=>{
  res.json({message:"Auth is working"});
}