import express from "express";
import { Addcategory, loginadmin } from "../controller/AdminController.js";
import Userauth from "../middleware/Userauth.js";
import Upload from "../middleware/Upload.js";

const router = express.Router();
// import router from "./Userrouter.js";
const uploadcategory = Upload("category");


// localhost:3000/adminapi/adminlogin
router.post("/adminlogin", loginadmin);


// localhost:3000/adminapi/addcategory

router.post("/addcategory",Userauth("admin"),uploadcategory.single('category_image') ,Addcategory);

export default router;
