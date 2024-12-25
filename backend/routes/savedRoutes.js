import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { getSavedRecipes, removeSavedRecipe, saveRecipe } from '../controllers/savedReceipeController.js';


const router = express.Router();

router.post('/save/:id',isAuth,saveRecipe);
router.get('/getsave',isAuth,getSavedRecipes);
router.delete('/delete/:id',isAuth,removeSavedRecipe);

export default router;