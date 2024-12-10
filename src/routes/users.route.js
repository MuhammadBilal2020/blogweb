import express from "express";
import {
 
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/users.controller.js";

const router = express.Router();

// register user
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);




export default router;