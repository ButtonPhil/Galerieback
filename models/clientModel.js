import bdd from '../configuration/bdd.js'


export const clientGet = () => {

    const listClient= " SELECT idClient, nom, prenom, email, adresse, pays, role from Clients";

    return bdd.query(listClient)

}
export const register = async (client) => {

    const createClient = "INSERT INTO Clients (nom, prenom, email, password, adresse, pays, role) value (?,?,?,?,?,?,?)";

    return bdd.query(createClient, [client.nom, client.prenom, client.email, client.cryptPass, client.adresse, client.pays, client.role]);

}
export const login = (email) => {

    const loginClient = "SELECT idClient, nom, prenom, email, password, adresse, pays, role from Clients where email = ?;";

    return bdd.query(loginClient, [email]);
    
}
export const getProfile = (idClient) => {
    
    const getProfile = "SELECT idClient, nom, prenom, email, password, adresse, pays, imageClient from Clients where idClient = ?;";

    // Exécute la requête de sélection avec l'ID utilisateur fourni
    return bdd.query(getProfile, [idClient]);

}
export const ClientProfile = (id) => {
    
    const getProfile = "SELECT idClient, nom, prenom, email, password, adresse, pays, imageClient from Clients where idClient = ?;";

    // Exécute la requête de sélection avec l'ID utilisateur fourni
    return bdd.query(getProfile, [id]);

}
export const updateInfoProfile = async (idClient, nom, prenom, adresse, pays) => {

    const updateInfoProfile = "UPDATE clients SET nom = ?, prenom = ?, adresse = ?, pays = ? WHERE idClient = ?";

    return bdd.query(updateInfoProfile, [ nom, prenom, adresse, pays, idClient]);
}
export const updateEmail = (email, idClient) => {

    const updateEmail = "UPDATE Clients SET email = ? WHERE idClient = ?;";
    
    return bdd.query(updateEmail, [email, idClient]);

}

export const getPassword = (profileId) => {

    const selectPassword = "SELECT password FROM Clients WHERE idClient = ?;";

    return bdd.query(selectPassword, [profileId])

}

export const updatePassword = (cryptedNewPassword, profileId) => {
     // préparation de la requete de mise à jour
    const updatePassword = "UPDATE Clients SET password = ? WHERE idClient = ?;";

    // Exécute la requête de mise à jour avec le nouveau mot de passe et l'ID utilisateur
    return bdd.query(updatePassword, [cryptedNewPassword, profileId]);

}

export const clientDelete = (profileId) => {

    const deleteClient = "DELETE FROM Clients WHERE idClient = ?";

    return bdd.query(deleteClient, [profileId]);

}

// export const mdpOublie = async (email) => {
//     const checkEmail = "SELECT id, login, email FROM utilisateur WHERE email = ?";
//     const [result] = await bdd.query(checkEmail, [email]);
//     return result;
// }