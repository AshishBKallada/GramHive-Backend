import express from 'express';
import { connectToMongoDB } from './config/db-config';
import routes from './Routes/routes';
import config from './config/server';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createSocketIoServer } from './config/socketConfig';
import helmet from 'helmet';
import { rateLimiter } from './middlewares/rateLimiter';
import errorHandler from './middlewares/errorHandler';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import hpp from 'hpp';
const morgan = require('morgan');

const app = express();
const port = config.PORT;

app.use(helmet({ xssFilter: true }));
app.use(ExpressMongoSanitize());
app.use(compression());
app.use(hpp());
app.use(morgan('dev'));
app.use(rateLimiter);
app.use(errorHandler);
app.use(cookieParser());
app.use(cors({ origin: config.ORIGIN, credentials: true, preflightContinue: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToMongoDB();

export const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const io = createSocketIoServer(server);

routes(app);
