import express from 'express';
import checkToken from "../middlewares/auth.js";
import { getType, registerArticle, registerType, searchCategorie } from '../controllers/articleController.js';






const router = express.Router();


router.post('/createCategorie', checkToken, registerType);

router.get('/typeCategorie', checkToken, getType)

router.get('/searchCategorie', checkToken, searchCategorie)

router.post('/createArticle', checkToken, registerArticle);



export default router;