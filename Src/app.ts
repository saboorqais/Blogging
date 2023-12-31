import express, { Express } from "express";
import routes from "./Routes/routes";
import bodyParser from "body-parser";
import paginate from "express-paginate";
import cors from "cors";
import path from "path";
import specs from "./Utils/Swagger/Swagger";
import { serve, setup } from "swagger-ui-express";
require("dotenv").config();

const app: Express = express();
app.use(bodyParser.json());
app.use(express.json());
const port: number = 3002;
const staticFilesDirectory = path.join(__dirname, "uploads");
app.use(paginate.middleware(10, 50));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (including images) from the 'uploads' directory
app.use(
    cors({
        origin: "*",
    })
);
app.use("/api-docs", serve, setup(specs));
app.use("/", routes);
app.use("/uploads", express.static(staticFilesDirectory));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
