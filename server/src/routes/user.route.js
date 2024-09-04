import { Router } from "express";
import { body } from "express-validator";
import requestHandler from "../handlers/request.handler.js";
import userController from "../controllers/user.controller.js";
import jwtMiddleware from "../middleware/jwt.middleware.js";
import userModel from "../models/user.model.js";

const router = Router();

router.post(
  "/create",
  body("username")
    .exists()
    .withMessage("username is mandatory!")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) return Promise.reject("username exists!");
    }),
  body("password")
    .exists()
    .withMessage("password is mandatory!")
    .isLength({ min: 6 })
    .withMessage("minimum password length is 6"),
  body("confirmPassword")
    .exists("confirm password field is empty!")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Password does not match!");
      return true;
    }),
  body("fullName").exists().withMessage("full name is mandatory!"),
  requestHandler.validate,
  userController.create
);

router.post(
  "/login",
  body("username").exists().withMessage("username is mandatory!"),
  body("password")
    .exists()
    .withMessage("password is mandatory!")
    .isLength({ min: 6 })
    .withMessage("minimum password length is 6"),
  requestHandler.validate,
  userController.login
);

router.get("/:id", jwtMiddleware.auth, userController.getUserByID);

export default router;
