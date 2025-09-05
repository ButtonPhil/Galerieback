import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bdd from './configuration/bdd.js';
import clientRoute from './routes/clientRoute.js'
import articleRoute from './routes/articleRoute.js'


const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

app.use('/Eternelles', clientRoute, articleRoute);

app.listen(process.env.PORT, () => {

    console.log(" Serveur is runnig on port 3000 ");

    if (bdd) {

        console.log("Database connection established");

    }

})

import fs from 'fs';
// Importation de multer
import multer from 'multer';
// Importation de path
import path from 'path';

// Ligne de configuration de multer pour enregistrer les fichiers dans le dossier images
const upload = multer({ dest: './images/' });

// Route POST pour l'upload de fichier
app.post('/image', upload.single('file'), (req, res) => {
    // Récupération du fichier
    const targetPath = path.join(__dirname, "./images/" + req.file.originalname.split(".")[0] +
        Date.now() + path.extname(req.file.originalname));
    // Vérification de l'extension du fichier
    const extension = path.extname(req.file.originalname).toLowerCase();
    if (extension === ".png"
        || extension === ".jpg"
        || extension === ".jpeg"
        || extension === ".webp"
        || extension === ".gif") {
        // fs.rename("chemin de l'ancien fichier", "chemin du nouveau fichier", function)
        fs.rename(req.file.path, targetPath, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de l\'enregistrement du fichier' });
            }
            return res.status(200).json({ message: 'Fichier reçu' });
        });
    } else {
        return res.status(500).json({ message: 'Extension de fichier non autorisée' });
    }
});


// Route GET pour récupérer un fichier
app.get('/image/:name', (req, res) => {
    // Récupération du nom du fichier
    const name = req.params.name;
    // Vérification de l'existence du fichier
    return res.sendFile(path.join(__dirname, './images/' + name));
});

app.delete('/image/:name', (req, res) => {
    // Récupération du nom du fichier
    const name = req.params.name;
    // Vérification de l'existence du fichier
    fs.unlink(path.join(__dirname, './images/' + name), (err) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la suppression du fichier' });
        }
        return res.status(200).json({ message: 'Fichier supprimé' });
    });
});




export default app;