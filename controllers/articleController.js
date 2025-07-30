import dotenv from "dotenv";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as articleModel from '../models/articleModel.js';



dotenv.config();

export const registerType = async (req, res) => {

    const { nomCategorie } = req.body;
    // console.log(req.body);
    const role = req.user.Role;
    // console.log(token);

    try {

        if (role === 1 ) {

            const typeData = { nomCategorie };
            // console.log(typeData);

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

    } catch (error) {

        res.status(400).json({ message: "Erreur liste des type", error })
        console.log(error);

    }

}

export const searchCategorie = async (req, res) => {

    const { nomCategorie } = req.body;
    // console.log(nomCategorie);
    
    try {
        
        await articleModel.categorieSearch(nomCategorie);
        // console.log(nomCategorie);

        res.status(200).json({ message: "Type trouver" });

    } catch (error) {
        
        res.status(400).json({ message: "Erreur lors de la recherche", error });

    }

}

export const registerArticle = async (req, res) => {

    const { nomCategorie } = req.body;
    // console.log(req.body);
    const role = req.user.Role;
    // console.log(token);

    try {

        if (role === 1 ) {

            const typeData = { nomCategorie };
            // console.log(typeData);

            await articleModel.typeRegister(typeData);

            res.status(200).json({ message: "Type créé" });

        } else {

            res.status(403).json({ message: "Erreur lors de la creation de type", error })

        }

    } catch (error) {

        res.status(400).json({ message: "Erreur lors de l'inscription", error })

    }

}

