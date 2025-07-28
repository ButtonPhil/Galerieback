import bdd from '../configuration/bdd.js'


export const clientGet = () => {

    const listClient= " SELECT idClient, nom, prenom, email, adresse, pays, role from Clients";

    return bdd.query(listClient)

}

export const register = (nom, prenom, email, cryptPass, adresse, pays) => {

    const createClient = "INSERT INTO Clients (nom, prenom, email, password, adresse, pays, role) value (?,?,?,?,?,?,?)";

    return bdd.query(createClient, [nom, prenom, email, cryptPass, adresse, pays, role]);

}

export const login = (email) => {

    const loginClient = "SELECT idClient, nom, prenom, email, adresse, pays, role from Clients where email = ?;";

    return bdd.query(loginClient[email]);
    
}