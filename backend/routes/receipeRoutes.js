import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { createRecipe } from '../controllers/receipeController.js';
import uploadFile from '../middlewares/multer.js';

const router = express.Router();
router.post('/create',isAuth,uploadFile,createRecipe);
export default router;