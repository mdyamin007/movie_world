import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";

/**
 * Handles user registration.
 *
 * Validates the request to ensure the username does not already exist, creates
 * a new user, and returns a JWT token for authentication. If an error occurs,
 * responds with a 500 Internal Server Error.
 *
 * @param {Object} req - The request object from the client, containing user details.
 * @param {Object} res - The response object to send the response.
 * @returns {void}
 */

const create = async (req, res) => {
  try {
    const { username, password, fullName } = req.body;
    // console.log(username);

    const oldUser = await userModel.findOne({ username });

    if (oldUser) return responseHandler.badrequest(res, "username exists!");

    const user = new userModel();

    user.fullName = fullName;
    user.username = username;
    user.setPassword(password);

    await user.save();

    const token = jsonwebtoken.sign({ data: user.id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

/**
 * Handles user login.
 *
 * Validates the provided credentials and returns a JWT token if authentication
 * is successful. If the user does not exist or the password is incorrect,
 * responds with a 400 Bad Request. If an error occurs, responds with a 500
 * Internal Server Error.
 *
 * @param {Object} req - The request object from the client, containing login credentials.
 * @param {Object} res - The response object to send the response.
 * @returns {void}
 */

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel
      .findOne({ username })
      .select("username password salt id fullName");

    if (!user) return responseHandler.badrequest(res, "User does not exist!");

    if (!user.validatePassword(password))
      return responseHandler.badrequest(res, "Incorrect password!");

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

const getUserByID = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) return responseHandler.notfound(res);

    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  create,
  login,
  getUserByID,
};
