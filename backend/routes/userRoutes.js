import express from 'express';
import { loginUser, logout, Myprofile, registerUser, userProfile } from '../controllers/userController.js';
import { isAuth } from '../middlewares/isAuth.js';
const router = express.Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",isAuth,logout);
router.get("/me",isAuth,Myprofile);
router.get("/:id",isAuth,userProfile);

export default router;