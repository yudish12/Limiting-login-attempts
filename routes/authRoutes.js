import express from "express";
import { loginController, loginView } from "../controllers/authController.js";

const router = express();

router.route("/").get((req, res) => {
  res.send("Hello from the server");
});

router.route("/login").get(loginView).post(loginController);

export default router;
