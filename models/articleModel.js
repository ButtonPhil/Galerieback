import bdd from '../configuration/bdd.js'


export const typeRegister = (typeData) => {

    // console.log("je suis dans le modèle");
    const Register = "INSERT INTO Categorie (nomCategorie) value (?)";

    return bdd.query(Register, [typeData.nomCategorie]);

}

export const typeGet = () => {

    const listType= " SELECT idCategorie, nomCategorie from Categorie";

    return bdd.query(listType)

}

export const categorieSearch = (nomCategorie) => {

    const typeSearch = " SELECT idCategorie, nomCategorie from Categorie where nomCategorie = (?);";

    return bdd.query(typeSearch[nomCategorie]);
    
}