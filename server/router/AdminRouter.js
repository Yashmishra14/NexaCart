import express from "express";
import { Addcategory, deletecategory, getallcategory, getsinglecategory, loginadmin, updatecategory } from "../controller/AdminController.js";
import Userauth from "../middleware/Userauth.js";
import Upload from "../middleware/Upload.js";

const router = express.Router();
// import router from "./Userrouter.js";
const uploadcategory = Upload("category");


// localhost:3000/adminapi/adminlogin
router.post("/adminlogin", loginadmin);


// localhost:3000/adminapi/addcategory
router.post("/addcategory",Userauth("admin"),uploadcategory.single('category_image') ,Addcategory);
// localhost:3000/adminapi/getallcategory
router.get("/getallcategory",Userauth("admin"),getallcategory);

// localhost:3000/adminapi/getsinglecategory
router.get("/getsinglecategory/:id",Userauth("admin"),getsinglecategory);

// localhost:3000/adminapi/deletecategory
router.post("/deletecategory/:id",Userauth("admin"),deletecategory);

// localhost:3000/adminapi/updatecategory
router.post("/updatecategory/:id",uploadcategory.single('category_image'),Userauth("admin"),updatecategory);

export default router;
