const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");
const auth = require("../middlewares/auth");
const Joi = require("joi");

const validator = require("express-joi-validation").createValidator({});
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

router.post(
  "/register",
  validator.body(registerSchema),
  authControllers.controllers.postRegister
);

router.post(
  "/login",
  validator.body(loginSchema),
  authControllers.controllers.postLogin
);

//test route to verify if our middleware is wokring or not

router.get("/test", auth, (req, res) => {
  res.send("request passed");
});
module.exports = router;
