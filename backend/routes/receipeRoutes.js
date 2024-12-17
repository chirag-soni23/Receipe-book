import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import upload from '../utils/multer.js';
import { addReceipe } from '../controllers/receipeController.js';

const router = express.Router();

router.post('/create',isAuth,upload,addReceipe);

export default router;