import express from 'express';
import checkToken from "../middlewares/auth.js";
import * as articleController from '../controllers/articleController.js';
import {upload} from "../configuration/configGallery.js"


const router = express.Router();


router.post('/createCategorie', checkToken, articleController.registerType);

router.get('/typeCategorie', checkToken, articleController.getType)

router.get('/searchCategorie', checkToken, articleController.searchCategorie)

// router.post('/createCategorie', checkToken, registerCategorie);

router.post('/createArticle', checkToken, articleController.registerArticle)

router.get('/article/:idImage', checkToken, articleController.getArticle)

router.put('/article/update/:idArticle', checkToken, articleController.updateArticle)

// router.delete('/delete/:idArticle', checkToken, articleController.deleteArticle)

router.post('/gallery', upload.single('img'), (req, res) => {articleController.addGallery(req, res)});

router.get('/gallery' , (req,res) => { articleController.getGallery(req, res)});
router.get('/gallery/:image', (req,res) => { articleController.getGalleryImage(req, res)});

router.delete('/deleteImage/:idImage', checkToken, articleController.deleteImage)

export default router;