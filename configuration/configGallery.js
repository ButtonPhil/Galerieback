import multer from 'multer';
// Importation de multer pour la gestion des fichiers

// Configuration du stockage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'img'); // Répertoire de destination
  },
  filename: function (req, file, cb) {
    req.body.image =  new String(Date.now() + '-' + file.originalname).replaceAll(' ',''); // Nom du fichier
    cb(null, req.body.image)
  }
});

export const upload = multer({ storage : storage });