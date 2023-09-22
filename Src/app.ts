import express, { Express } from "express";
import routes from "./Routes/routes";
import bodyParser from "body-parser";
import paginate from "express-paginate";
import cors from "cors";
import path from "path";

require("dotenv").config();

const app: Express = express();
app.use(bodyParser.json());
app.use(express.json());
const port: number = 3002;
const staticFilesDirectory = path.join(__dirname, "uploads");
const allowedOrigins = ['https://khg4p5t5-5173.inc1.devtunnels.ms'];
app.use(paginate.middleware(10, 50));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (including images) from the 'uploads' directory
app.use(cors({
  origin:"*"
}));
app.use("/", routes);
app.use("/uploads", express.static(staticFilesDirectory));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
