import express from 'express';
import checkToken from "../middlewares/auth.js";
import * as clientController from '../controllers/clientContoller.js';




const router = express.Router();

router.post('/createClient', clientController.register);

router.post('/login', clientController.login);

router.get('/client', checkToken, clientController.clientGet);

router.get('/profile/:idClient', checkToken, clientController.getProfileClient)

router.get('/profile', checkToken, clientController.getProfile);

router.put('/updateInfoProfile', checkToken, (req, res) => {
    clientController.updateInfoProfile(req, res)
});

router.put('/updateMail', checkToken, clientController.updateEmail);

router.put('/updatePassword', checkToken, clientController.updatePassword);

router.delete('/deleteClient/:idClient',checkToken, clientController.deleteClient)

// router.post('/mdpOublie', utilisateurController.mdpOublie);


export default router;