import express from 'express';
import { connectToMongoDB } from './data/interfaces/data-sources/db-config';
import routes from './frameworks/routes';
import config from './config/server';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { initializeSocket } from './data/data-sources/socket-io/socketioconfig';

const app = express();
const port = config.PORT;

app.use(cookieParser());
app.use(cors({ origin: config.ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToMongoDB();

const httpServer = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const io = initializeSocket(httpServer);
routes(app)

