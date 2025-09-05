import express from 'express';
import checkToken from "../middlewares/auth.js";
import { register, clientGet, login, getProfile, updateEmail, updatePassword, deleteClient, getProfileClient} from '../controllers/clientContoller.js';




const router = express.Router();

router.get('/client', checkToken, clientGet);

router.post('/createClient', register);

router.post('/login', login);

router.get('/profile/:idClient', checkToken, getProfileClient)

router.get('/profile', checkToken, getProfile);

router.put('/profile/update', checkToken, updateEmail);

router.put('/profile/password', checkToken, updatePassword);

router.delete('/deleteClient/:idClient',checkToken, deleteClient)

// router.post('/mdpOublie', utilisateurController.mdpOublie);



export default router;