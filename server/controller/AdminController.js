import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../model/Admin.js";
import { Category } from "../model/Catagory.js";

export const loginadmin = async (req, res) => {
  const admin_email = req.body.admin_email;
  const admin_pass = req.body.admin_pass;

  try {
    const adminLogin = await Admin.findOne({ admin_email });
    if (!adminLogin) {
      return res.json({ loginsts: 1, msg: "Admin email is wrong" });
    }

    const isMatch = await bcrypt.compare(admin_pass, adminLogin.admin_password);
    if (!isMatch) {
      return res.json({ loginsts: 2, msg: "Admin password is wrong" });
    }

    const token = jwt.sign(
      { id: adminLogin._id, admin_email: adminLogin.admin_email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ loginsts: 0, msg: "Admin Login Success", token });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};


export const Addcategory = async (req, res) => {
    

    try {
        const  category_name  = req.body.category_name;
    const category_image = req.file?.path;
    
    const newCategory = new Category({
        category_name: category_name,
        category_image: category_image,
    })
const savecat= newCategory.save();
    res.json({ msg: "Category added successfully", category: savecat });

        // res.json({ msg: "Category added successfully" });
        
    } catch (error) {
        res.json({ msg: "Error in adding category", error: error.message });
        
    }

}



