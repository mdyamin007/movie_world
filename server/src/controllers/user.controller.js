import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";

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
