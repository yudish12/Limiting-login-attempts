import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import router from "./routes/authRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.enable("trust proxy");
app.use(cors());
app.options("*", cors());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use((req, res, next) => {
  req.reqTime = new Date().toISOString();
  next();
});

app.use("/", router);

const server = app.listen(5000, () => {
  console.log("server started");
});
