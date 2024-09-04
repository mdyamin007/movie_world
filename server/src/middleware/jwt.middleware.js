import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";

/**
 * Decodes and verifies the JWT token from the request headers.
 *
 * @param {Object} req - The request object from the client.
 * @returns {Object|boolean} The decoded token if valid, otherwise false.
 */

const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];

      return jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    }

    return false;
  } catch {
    return false;
  }
};
/**
 * Middleware to authenticate the user by verifying the JWT token.
 *
 * Retrieves the token from the request headers, decodes it, and checks if
 * the associated user exists in the database.
 *
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to send back to the client.
 * @param {Function} next - The function to call the next middleware in the stack.
 */

const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);

  if (!tokenDecoded) return responseHandler.unauthorize(res);

  const user = await userModel.findById(tokenDecoded.data);

  if (!user) return responseHandler.unauthorize(res);

  req.user = user;

  next();
};

export default { auth, tokenDecode };
