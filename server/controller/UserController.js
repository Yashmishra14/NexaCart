import { configDotenv } from "dotenv";
configDotenv();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
import Productmodel from "../model/Product.js";
import Cart from "../model/Cart.js";


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

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ U_email: email });
    if (!user) {
      res.json({ message1: "User not found" });
    } else {
      const isMatch = await bcrypt.compare(password, user.U_password);

      if (!isMatch) {
        res.json({ message2: "Invalid password" });
      } else {
        const token = jwt.sign(
          {
            id: user._id,
            email: user.U_email,
            role: "user"
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        )
        res.json({ message3: "Login successful", "token": token });

      }
    }
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export const addtocart = async (req, res) => {
  try {
    const { User_id, Product_id, product_qty } = req.body;
    const cart = new Cart({
      User_id,
      Product_id,
      product_qty
    });
    const savedCart = await cart.save();
    res.json({ message: "Cart added successfully", cart: savedCart });
  } catch (error) {
    res.json({ message: error.message });
  }
}


export const allproduct = async (req, res) => {
  try {
    const product = await Productmodel.find()
    res.json({ message: "All products", product })

  } catch (error) {
    res.json({ message: error.message });

  }
}

export const test = (req, res) => {
  res.json({ message: "Auth is working" });
}