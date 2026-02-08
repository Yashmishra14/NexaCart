import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../model/Admin.js";
import { Category } from "../model/Catagory.js";
import cloudinary from "../Config/cloudinary.js";
import Product from "../model/Product.js";
import ProductImage from "../model/Productimage.js";

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
const savecat=await  newCategory.save();
    res.json({ msg: "Category added successfully", category: savecat });

        // res.json({ msg: "Category added successfully" });
        
    } catch (error) {
        res.json({ msg: "Error in adding category", error: error.message });
        
    }

}

export const getallcategory = async (req, res) => {
  try {
    const categories = await Category.find().sort({ created_at: -1 });
    res.json({ msg: "Categories fetched successfully", categories });    
  } catch (error) {
    res.json({ msg: "Error in fetching categories", error: error.message });
    
  }
}

export const getsinglecategory = async (req, res) => {
  const {id} = req.params;
  // res.json({ msg: "Single category id received", id });
  try {
    const category = await Category.findById(id);
    res.json({ msg: "Single category fetched successfully", category });
  } catch (error) {
    res.json({ msg: "Error in fetching single category", error: error.message });
    
  }
}

export const deletecategory =async (req, res) => {
  const {id} = req.params;

  try {
        const category = await Category.findById(id);
       const imgeUrl = category.category_image;
       const part =imgeUrl.split("/");
       const filename = part[part.length - 1];
       const publicid = `E-commerce/${filename.split(".")[0]}`;
       await cloudinary.uploader.destroy(`category/${publicid}`);
       await Category.findByIdAndDelete(id);
       res.json({ msg: "Category deleted successfully" }); 
                                                                                                     
    
  } catch (error) { 
    res.json({ msg: "Error in deleting category", error: error.message });
    
  }


}

 export const updatecategory = async (req, res) => {
    const {id} = req.params;

    const category_name = req.body?.category_name;
    const updateData = { };

    try {
        if (category_name) {
            updateData.category_name = category_name;
        }

        if(req.file){
            const category = await Category.findById(id);
            const imgeUrl = category.category_image;
            const part = imgeUrl.split("/");
            const filename = part[part.length - 1];
            const publicid = `E-commerce/category/${filename.split(".")[0]}`;
            await cloudinary.uploader.destroy(publicid);
            updateData.category_image = req.file.path;
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );
       
        res.json({ msg: "Category updated successfully", category: updatedCategory });
    } catch (error) {
        res.json({ msg: "Error in updating category", error: error.message });
    }
 }

 export const addproduct = async (req, res) => {
  const   product_name= req.body.product_name;
  const Product_Category = req.body.Product_Category;
  const Product_description = req.body.Product_description;
  const Product_price = req.body.Product_price;
  // const product_images = req.files.map(file => file.path);

  try {
    if (!req.files||req.files.length===0) {
      return res.json({ msg: "At least one product image is required" });
      
    }
    const mainImage = req.files[0].path;
    const newProduct = new Product({ 
       product_name,
       Product_description,
       Product_price,
       Product_image: mainImage,
       Product_Category,

    
    })
    const savedProduct = await newProduct.save();
    const imagedocs =req.files.map(file => ({
      product: savedProduct._id,
      image: file.path,
    }));

    await ProductImage.insertMany(imagedocs);
    res.json({ msg: "Product added successfully", product: savedProduct });
    


  } catch (error) {
    res.json({ msg: "Error in adding product", error: error.message });
    
  }
 }


