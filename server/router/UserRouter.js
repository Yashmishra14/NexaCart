import express from "express";
// import {  Login, reguser, test } from "../controller/usercontroller.js";
import { allproduct, Login, reguser, test } from "../controller/UserController.js";

import Userauth from "../middleware/Userauth.js";

const router = express.Router();

router.post("/register", reguser)

router.post("/login", Login)

router.post("/testuserauth", Userauth("user"), test)
//localhost:3000/user/allproduct
router.get("/allproduct", allproduct)


export default router;