import multer from 'multer';
// Importation de multer pour la gestion des fichiers

// Configuration du stockage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'img'); // Répertoire de destination
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nom du fichier
  }
});

export const img = multer({ storage : storage });