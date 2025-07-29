import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bdd from './configuration/bdd.js';
import clientRoute from './routes/clientRoute.js'



const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

app.use('/galerie', clientRoute);

app.listen(process.env.PORT, () => {

    console.log(" Serveur is runnig on port 3000 ");

    if (bdd) {

        console.log("Database connection established");
        
    }
    
})

export default app;