import dotenv from "dotenv";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as clientModel from '../models/clientModel.js';

dotenv.config();

export const clientGet = async (req, res) => {

    try {

        const [result] = await clientModel.clientGet();

        res.status(200)
        res.json({

            message: "Liste client",
            client: result

        })

    } catch (error) {

        res.status(400).json({ message: "Erreur liste Client", error })
        console.log(error);

    }

}


export const register = async (req, res) => {

    const { nom, prenom, email, password, adresse, pays, role } = req.body;

    try {

        const cryptPass = await bcrypt.hash(password, 10);

        await clientModel.register(nom, prenom, email, cryptPass, adresse, pays, role);

        res.status(200).json({ message: "Utilisateur créé" });

    } catch (error) {

        res.status(400).json({ message: "Erreur lors de l'inscription", error })

    }

}


export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const [result] = await clientModel.login(email);

        const clientData = result[0]

        if (result) {

            //on verifie et compare le password à celui de la bdd
            const checkPassword = await bcrypt.compare(password, clientData.password);

            if (checkPassword == true) {

                // création du token
                const token = jwt.sign({ idClient: clientData.idClient, nom: clientData.nom, Role: clientData.role }, process.env.SECRET_KEY, { expiresIn: "6h" });

                res.status(200).json({
                    message: "Connexion autorisé",
                    token: token
                });

            } else {

                res.status(403).json({ message: "Password incorrcte" });

            }

        } else {

            res.status(104).json({ message: "Utilisateur inconnu" })

        }

    } catch (error) {


        res.status(500).json({ error })
        console.log(error);

    }
}