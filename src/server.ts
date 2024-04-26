import express from 'express';
import { connectToMongoDB } from './data/interfaces/data-sources/db-config';
import routes from './frameworks/routes';
import config from './config/server';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();
const port = config.PORT;

app.use(cookieParser());
app.use(cors({ origin: config.ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToMongoDB();

routes(app)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
