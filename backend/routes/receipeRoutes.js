import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import upload from '../utils/multer.js';
import { addReceipe, deleteReceipe, getAllReceipe, getSingleReceipe, updateReceipe } from '../controllers/receipeController.js';

const router = express.Router();

router.post('/create',isAuth,upload,addReceipe);
router.get('/getall',isAuth,getAllReceipe);
router.get('/get/:id',isAuth,getSingleReceipe);
router.put('/update/:id',isAuth,updateReceipe);
router.delete('/delete/:id',isAuth,deleteReceipe);

export default router;