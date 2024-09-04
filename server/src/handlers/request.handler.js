import { validationResult } from "express-validator";

/**
 * Middleware to validate request data using express-validator.
 *
 *
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to send back to the client.
 * @param {Function} next - The function to call the next middleware in the stack.
 * @returns {void}
 */

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({
      error: errors,
      message: errors?.array()[0]?.msg,
    });

  next();
};

export default { validate };
