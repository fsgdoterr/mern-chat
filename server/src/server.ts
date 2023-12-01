import './config/config';
import express from 'express';
import dbService from './services/db.service';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import router from './routes';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    exposedHeaders: ['access-token'],
}));
app.use(cookieParser());
app.use(fileUpload());
app.use(`/api/v${process.env.API_VERSION}`, router);
app.use(errorMiddleware);

const startApp = async () => {
    try {
        await dbService.connect();
        app.listen(PORT, () => console.log(`Server started on port - ${PORT}`))
    } catch(e) {
        console.log(e);
    }
}

startApp();