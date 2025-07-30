import bdd from '../configuration/bdd.js'


export const typeRegister = (typeData) => {

    // console.log("je suis dans le modèle");
    const Register = "INSERT INTO Categorie (nomCategorie) value (?)";

    return bdd.query(Register, [typeData.nomCategorie]);

}

export const typeGet = () => {

    const listType = " SELECT idCategorie, nomCategorie from Categorie";

    return bdd.query(listType)

}

export const categorieSearch = (nomCategorie) => {

    console.log(nomCategorie);
    const typeSearch = " SELECT idCategorie, nomCategorie from Categorie where nomCategorie = ?;";

    return bdd.query(typeSearch, [nomCategorie]);

}

export const registerArticle = async (articleData) => {

    const RegisterArt = "INSERT INTO Article (nomArticle, prix, dimension, description, categorieId) VALUES (?, ?, ?, ?, ?)";

    try {

        // Envoi de la première requête d'insertion
        const [result] = await bdd.query(RegisterArt, [

            articleData.nomArticle,
            articleData.prix,
            articleData.dimension,
            articleData.description,
            articleData.categorieId

        ]);

        // Récupérer l'ID auto-incrémenté de l'insertion
        const artId = result.insertId;

        // Retourner l'ID de l'article
        return artId;

    } catch (error) {

        console.error("Erreur lors de l'insertion de l'article", error);
        throw error;  // Relancer l'erreur pour gestion dans le contrôleur

    }
};


export const registerImage = async (image) => {

    const RegisterImg = "INSERT INTO Image (image) value (?)";

    try {

        const [result] = await bdd.query(RegisterImg, [image]);

        const imgId = result.insertId;

        return imgId;

    } catch (error) {

        console.error("Erreur lors de l'insertion de l'article", error);
        throw error;  // Relancer l'erreur pour gestion dans le contrôleur

    }


}

export const registerProteuse = (artId, imgId ) => {
    console.log(artId, imgId);

    const Porteuseregister = "INSERT INTO Porteuse (articleId, imageId) value (?,?)";

    return bdd.query(Porteuseregister,[artId, imgId]);

}

export const articleGet = () => {

    const listArticle = " SELECT idArticle, nomArticle, prix, dimension, description, categorieId, nomCategorie, idImage, image from Image JOIN Porteuse on imageId = idImage JOIN Article on idArticle = articleId JOIN Categorie on categorieId = idCategorie ";

    return bdd.query(listArticle)

}

export const articleUpdate = (modifyData) => {

    const upArticle = "UPDATE Article SET nomArticle = ?, prix = ?, dimension = ?, description = ? where idArticle = (?);";

    return bdd.query(upArticle, [modifyData.nomArticle, modifyData.prix, modifyData.dimension, modifyData.description, modifyData.idArticle]);
   
}

export const imageUpdate = ( modifyImage) => {

    const upImage = "UPDATE Image SET image = ? where idImage = (?);";

    return bdd.query(upImage,[ modifyImage.image, modifyImage.idImage]);

}

export const articleDelete = (idArticle) => {

    const deleteArticle = "DELETE FROM Article WHERE idArticle = ?";

    return bdd.query(deleteArticle, [idArticle]);

}