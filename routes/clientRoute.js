import express from 'express';
import checkToken from "../middlewares/auth.js";
import { register, clientGet, login} from '../controllers/clientContoller.js';




const router =express.Router();

router.get('/client', clientGet);

router.post('/createClient', register);

router.get('/login', login);
