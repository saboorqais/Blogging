import cookieParser from "cookie-parser";


require('dotenv').config();
import express, {Express} from 'express';
import routes from "./Routes/routes";
import bodyParser from "body-parser";
import paginate from 'express-paginate'
import cors from 'cors'
import path from "path";
const app:Express = express();
const port: number = 3002;
const staticFilesDirectory = path.join(__dirname, 'uploads');

app.use(paginate.middleware(10, 50));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())
// Serve static files (including images) from the 'uploads' directory
app.use(cors());
app.use("/", routes)
app.use('/uploads', express.static(staticFilesDirectory));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
