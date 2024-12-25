import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { getSavedReceipe, savedReceipe } from '../controllers/savedReceipeController.js';
const router = express.Router();

router.post('/save',isAuth,savedReceipe);
router.get('/getsave/:userId',isAuth,getSavedReceipe);

export default router;