import express from "express";
// import {  Login, reguser, test } from "../controller/usercontroller.js";
import { Login, reguser, test } from "../controller/UserController.js";

import Userauth from "../middleware/Userauth.js";

const router = express.Router();

router.post("/register", reguser)

router.post("/login",Login)

router.post("/testuserauth",Userauth("user" ),test)


export default router;