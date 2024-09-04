import { Router } from "express";
import { body } from "express-validator";
import requestHandler from "../handlers/request.handler.js";
import userController from "../controllers/user.controller.js";
import jwtMiddleware from "../middleware/jwt.middleware.js";
import userModel from "../models/user.model.js";

const router = Router();

/**
 * Route to create a new user.
 *
 * @route POST /create
 * @middleware requestHandler.validate - Middleware to validate the request body.
 * @body {string} username - The username for the new user.
 * @body {string} password - The password for the new user (minimum 6 characters).
 * @body {string} confirmPassword - The confirmation password to match with the provided password.
 * @body {string} fullName - The full name of the new user.
 * @returns {Object} - Created user information along with a JWT token.
 */

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

/**
 * Route for user login.
 *
 * @route POST /login
 * @middleware requestHandler.validate - Middleware to validate the request body.
 * @body {string} username - The username of the user trying to log in.
 * @body {string} password - The password of the user (minimum 6 characters).
 * @returns {Object} - JWT token and user information if authentication is successful.
 */

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

/**
 * Route to get user information by ID.
 *
 * @route GET /:id
 * @middleware jwtMiddleware.auth - Middleware to authenticate the user.
 * @param {string} id - The ID of the user whose information is to be fetched.
 * @returns {Object} - User information if the user is found and authenticated.
 */

router.get("/:id", jwtMiddleware.auth, userController.getUserByID);

export default router;
