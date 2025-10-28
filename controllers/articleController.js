import dotenv from "dotenv";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as articleModel from '../models/articleModel.js';
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

export const registerType = async (req, res) => {

    const { nomCategorie } = req.body;

    const role = req.user.Role;

    try {

        if (role === 1) {

            const typeData = { nomCategorie };

            await articleModel.typeRegister(typeData);

            res.status(200).json({ message: "Type créé" });

        } else {

            res.status(403).json({ message: "Erreur lors de la creation de type", error })

        }

    } catch (error) {

        res.status(400).json({ message: "Erreur lors de l'inscription", error })

    }

}

export const getType = async (req, res) => {

    try {

        const [result] = await articleModel.typeGet();

        res.status(200)
        res.json({

            message: "Liste des type",
            type: result

        })

        console.log(type);

    } catch (error) {

        res.status(400).json({ message: "Erreur liste des type", error })
        console.log(error);

    }

}

export const searchCategorie = async (req, res) => {

    const { nomCategorie } = req.body;

    try {

        const result = await articleModel.categorieSearch(nomCategorie);

        res.status(200).json({ message: "Type trouver", type: result });

    } catch (error) {

        res.status(400).json({ message: "Erreur lors de la recherche", error });
        console.log(error);

    }

}

// Creation d'aticle 
export const registerArticle = async (req, res) => {

    const { nomArticle, prix, dimension, description, categorieId } = req.body;

    const role = req.user.Role;

    const { image } = req.body;

    try {

        if (role === 1) {

            //regroupement des donnees Article
            const articleData = { nomArticle, prix, dimension, description, categorieId }
            // console.log(articleData);

            // Envoie des donnees Article
            const artId = await articleModel.registerArticle(articleData);

            // Envoie des donnees Image
            const imgId = await articleModel.registerImage(image);
            res.status(200).json({ artId, imgId });

            await articleModel.registerProteuse(artId, imgId);
            res.status(200)

        } else {

            res.status(403).json({ message: "Erreur lors de la creation de article", error })

        }

    } catch (error) {

        res.status(400).json({ message: "Erreur lors de la creation", error })

    }

}

export const getArticle = async (req, res) => {

    try {

        const idImage = req.params.idImage;

        const [result] = await articleModel.articleGet(idImage);

        res.status(200)
        res.json({

            message: "info articles",
            article: result

        })

    } catch (error) {

        res.status(400).json({ message: "Erreur liste des type", error })
        console.log(error);

    }

}

export const updateArticle = async (req, res) => {

    const { nomArticle, prix, dimension, description } = req.body;
    const idArticle = req.params.idArticle;
    const { image, idImage } = req.body;

    try {

        const modifyData = { nomArticle, prix, dimension, description, idArticle }
        const modifyImage = { image, idImage }
        console.log(modifyData);


        await articleModel.articleUpdate(modifyData);
        await articleModel.imageUpdate(modifyImage);
        res.status(200).json({ message: " Modification reussi " });


    } catch (error) {

        res.status(400).json({ message: "Erreur modification ", error })
        console.log(error);

    }


}

// export const deleteArticle = async (req, res) => {

//     const idArticle = req.params.idArticle;
//     const 

//     try {

//         await articleModel.porteuseDelete(idArticle);
//         await articleModel.articleDelete(idArticle);
//         await articleModel.imageDelete(idImage)
//         res.status(200).json({ message: "Suppression de l'article" });

//     } catch (error) {

//         res.status(500).json({ message: "erreur lors de la suppression", error });
//         console.log(error);

//     }

// }

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addGallery = async (req, res) => {

    try {
        const img = req.body;
        console.log("titi",req.body);
        
        articleModel.addGallery(img);
        res.send("Ajouté")
    } catch (error) {
        console.error(error);
        res.send('error')
    }
}

export const getGallery = async (req,res) => {
    try {
        const image = req.params.image;
        res.sendFile(path.join(__dirname, '../img/'+req.params.type+image))
    } catch (error) {
        console.log(error);
        
        res.send(error)
    }   
}

export const deleteImage = async (req, res) => {

    const idImage = req.params.idImage

    try {
        
        await articleModel.imageDelete(idImage)

    } catch (error) {
        
        console.log(error);
    }
}


























// export const registerCategorie = async (req, res) => {

//     const { nomCategorie } = req.body;

//     const role = req.user.Role;

//     try {

//         if (role === 1) {

//             const typeData = { nomCategorie };

//             await articleModel.typeRegister(typeData);

//             res.status(200).json({ message: "Type créé" });

//         } else {

//             res.status(403).json({ message: "Erreur lors de la creation de type", error })

//         }

//     } catch (error) {

//         res.status(400).json({ message: "Erreur lors de l'inscription", error })

//     }

// }