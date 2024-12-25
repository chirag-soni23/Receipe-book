import express from 'express';
import { createRecipe, deleteRecipe, getAllRecipes, getRecipeById, updateRecipe } from '../controllers/receipeController.js';
import { isAuth } from '../middlewares/isAuth.js';
import upload from '../utils/multer.js';


const router = express.Router();

router.post('/create',isAuth, upload.single('image'), createRecipe);
router.get('/:id',isAuth,getRecipeById);
router.get('/', isAuth,getAllRecipes);
router.put('/:id',isAuth,upload.single('image'), updateRecipe);
router.delete('/:id',isAuth,deleteRecipe);

export default router;
