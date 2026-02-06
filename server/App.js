import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import bcrypt from "bcryptjs";

import mongoose from "mongoose";
import "./Db/db.js";

// import userRouter from "./router/UserRouter.js";
import userRouter from "./router/Userrouter.js";
import adminRouter from "./router/AdminRouter.js";
import AdminModel from "./model/Admin.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Routers (same style as your screenshot)
app.use("/userapi", userRouter);
app.use("/adminapi", adminRouter);

async function createDefaultAdmin() {
  const admin_name = "Admin";
  const admin_email = "admin@14.com";
  const admin_password = "admin14";

  try {
    const existingAdmin = await AdminModel.findOne({ admin_email });
    if (existingAdmin) {
      console.log("Default Admin Already Exist");
      return;
    }

    const newAdmin = new AdminModel({
      admin_name,
      admin_email,
      admin_password: bcrypt.hashSync(admin_password, 10),
    });

    await newAdmin.save();
    console.log("Default Admin created");
  } catch (error) {
    console.error("Error creating default admin:", error);
  }
}

mongoose.connection.once("open", () => {
  createDefaultAdmin();
});

export default app;
