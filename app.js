import cors from 'cors';
// import unknownEndpoint from "../utils/unknownEndpoint.js";
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import connectToDB from './utils/connectToDB.js';


dotenv.config();


const MONGODB_URI = process.env.MONGODB_URI;
const app = express();

connectToDB(MONGODB_URI);

morgan.token("body", function (req, res) {
    return JSON.stringify(req.body); 
});


app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(morgan(":method :url :status :body"));

// app.use
// // 



// app.use(unknownEndpoint);
export default app;


