import express from 'express';
import { connectToMongoDB } from './data/interfaces/data-sources/db-config';
const cookieParser = require('cookie-parser');
import routes from './frameworks/routes';

const app = express();
const cors = require('cors');
const port = 3000;

app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToMongoDB();

routes(app)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
