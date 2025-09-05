import express from 'express';
import checkToken from "../middlewares/auth.js";
import { carouselImg, deleteArticle, getArticle, getType, registerArticle, registerType, searchCategorie, updateArticle } from '../controllers/articleController.js';






const router = express.Router();


router.post('/createCategorie', checkToken, registerType);

router.get('/typeCategorie', checkToken, getType)

router.get('/searchCategorie', checkToken, searchCategorie)

// router.post('/createCategorie', checkToken, registerCategorie);

router.post('/createArticle', checkToken, registerArticle)

router.get('/article', checkToken, getArticle)

router.put('/article/update/:idArticle', checkToken, updateArticle)

router.delete('/delete/:idArticle', checkToken, deleteArticle)

router.get('/carouselImg' , checkToken, carouselImg)

export default router;