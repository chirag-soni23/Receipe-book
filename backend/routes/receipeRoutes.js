import express from 'express';
import { isAuth } from '../middlewares/isAuth';
import uploadFile from '../middlewares/multer';
import { createReceipe } from '../controllers/receipeController';
const router = express.Router();

router.post('/create',isAuth,uploadFile,createReceipe);
export default router;