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
    // console.log(req.body)
    try {

        const cryptPass = await bcrypt.hash(password, 10);
        // console.log(cryptPass);

        const clientData = { nom, prenom, email, cryptPass, adresse, pays, role };
        console.log(clientData);

        const client = await clientModel.register(clientData);

        res.status(200).json({ message: "Utilisateur créé", client });

    } catch (error) {

        res.status(400).json({ message: "Erreur lors de l'inscription", error })

    }

}


export const login = async (req, res) => {

    const { email, password } = req.body;


    try {

        // appel de la fonction loginUser du modèle userModels
        // cette fonction permet de récupérer les données de l'utilisateur à partir de son mail
        const [result] = await clientModel.login(email);
        // console.log(result);

        const clientData = result[0]
        // console.log(clientData);

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

export const getProfile = async (req, res) => {

    // récupération de l'id de l'utilisateur à partir du token grace à user
    // le token est vérifié par le middleware checkToken
    const profileId = req.user.idClient
    // console.log(req.user);

    try {

        const [result] = await clientModel.ProfileClient(profileId);

        if (result.length > 0) {

            res.status(200).json(result[0]);

        } else {

            res.status(404).json({ message: "utilisateur non trouvé" });
        }

    } catch (error) {

        res.status(500).json({ message: "erreur lors de la récupération du profil", error });
        console.log(error);

    }

}

export const updateEmail = async (req, res) => {

    // récupération de l'id de l'utilisateur à partir du token
    const profileId = req.user.idClient;
    console.log(profileId);

    // récupération des informations à mettre à jour
    const email = req.body.email;
    console.log(email);

    try {

        // utilisation de la connexion bdd pour executer la requete
        await clientModel.updateEmail(email, profileId);
        // envoi de la réponse
        res.status(200).json({ message: "Email mis à jour" });

    } catch (error) {

        res.status(500).json({ message: "erreur lors de la mise à jour du email", error });
        console.log(error);

    }

}

export const updatePassword = async (req, res) => {

    // récupération de l'id de l'utilisateur à partir du token
    const profileId = req.user.idClient;
    // console.log(profileId);

    // récupération des informations à mettre à jour
    const { oldPassword, newPassword } = req.body;
    console.log(oldPassword);

    try {

        // récupération de l'utilisateur pour vérifier l'ancien mot de passe
        const [result] = await clientModel.getPassword(profileId);
        // console.log(result);

        if (result.length > 0) {

            const clientData = result[0];
            // console.log(clientData.password);

            // vérification de l'ancien mot de passe
            const checkOldPassword = await bcrypt.compare(oldPassword, clientData.password);
            
            
            if (checkOldPassword) {
                // cryptage du nouveau mot de passe
                const cryptedNewPassword = await bcrypt.hashSync(newPassword, 10);
                // console.log(newPassword);

                // utilisation de la connexion bdd pour executer la requete
                await clientModel.updatePassword(cryptedNewPassword, profileId);
                res.status(200).json({ message: "mot de passe mis à jour" });

            } else {

                res.status(403).json({ message: "ancien mot de passe incorrect" });

            }
        } else {

            res.status(404).json({ message: "utilisateur non trouvé" });

        }

    } catch (error) {

        res.status(500).json({ message: "erreur lors de la mise à jour du mot de passe", error });
        console.log(error);

    }
}

export const deleteClient = async (req, res) => {

    const profileId = req.params.idClient

    // console.log(profileId)

    try {

        await clientModel.clientDelete(profileId);
        res.status(200).json({ message: "Suppression compte" });

    } catch (error) {

        res.status(500).json({ message: "erreur lors de la suppression", error });
        console.log(error);

    }

}


// export const mdpOublie = async (req, res) => {
//     const { email } = req.body;

//     try {
//         const utilisateur = await modelUtilisateur.mdpOublie(email);

//         if (utilisateur.length === 0) {
//             return res.status(404).json({ message: "Email non trouvé" });
//         }

//         const tokenReset = jwt.sign({ id: utilisateur[0].id }, process.env.SECRET_KEY, { expiresIn: '1h' });

//         transporter.sendMail(mailMdpOublie(email, utilisateur[0].login, tokenReset), (error, info) => {
//             if (error) {
//                 return console.log("Erreur envoi mail :", error);
//             }
//             console.log("Mail envoyé :", info.response);
//         });


//         // Logique pour envoyer un email de réinitialisation de mot de passe
//         // ...

//         res.status(200).json({ message: "Email de réinitialisation envoyé" });

//     } catch (error) {
//         console.error("Erreur lors de la récupération du mot de passe :", error);
//         res.status(500).json({ message: "Erreur serveur" });
//     }
// };