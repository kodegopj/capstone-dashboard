import cors from 'cors';
import unknownEndpoint from "./utils/unknownEndpoint.js";
import express from 'express';
import morgan from 'morgan';
import connectToDB from './middlewares/connectToDB.js';
import noteRouter from './routes/noteRouter.js'
import errorHandler from './middlewares/errorHandler.js';
import config from './utils/config.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js'



const MONGODB_URI = config.MONGODB_URI;
const app = express();

connectToDB(MONGODB_URI);

morgan.token("body", function (req, res) {
    return JSON.stringify(req.body); 
});


app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(morgan(":method :url :status :body"));


app.use("/users", userRouter);
app.use("/notes", noteRouter);
app.use("/products", productRouter);


app.use(unknownEndpoint);
app.use(errorHandler);

export default app;


