import { createRequire } from "module";
const require = createRequire(import.meta.url);
const data = require("../database.json");

export const loginView = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    res.send(error);
  }
};

export const loginController = async (req, res) => {
  console.log("asd");
  try {
    const user = data.find(
      (e) => JSON.stringify(req.body) === JSON.stringify(e)
    );
    if (!user) {
      return res.json({
        message: "fail",
        payload: "Invalid Credentials Please try again",
      });
    }

    res.json({ message: `success`, payload: user });
  } catch (error) {
    console.log(error);
    res.json({ message: "fail", payload: error });
  }
};
