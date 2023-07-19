import express from "express";
import { loginController, loginView } from "../controllers/authController.js";
import limiter from "express-rate-limit";

const router = express();

router.route("/").get((req, res) => {
  res.send("Hello from the server");
});

//limitig login attempts
let date;
const loginLimit = limiter({
  max: 3,
  windowMs: 60 * 1000,
  handler: (req, res, next) => {
    const date = new Date(req.rateLimit.resetTime);
    req.rateLimit.resetTime = date.toLocaleTimeString();
    res.status(429).json({
      message: "fail",
      payload: `Too many failed Login Attempts Please Retry At ${req.rateLimit.resetTime}`,
    });
  },
  requestWasSuccessful: (request, response) => response.statusCode < 400,
  skipSuccessfulRequests: true,
});

router.route("/login").get(loginView).post(loginLimit, loginController);

export default router;
