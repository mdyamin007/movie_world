import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";
/**
 * Creates a new review.
 *
 *
 * @param {Object} req - The request object from the client, containing review data.
 * @param {Object} res - The response object to send the response.
 * @returns {void}
 */

const create = async (req, res) => {
  try {
    const { movieId } = req.params;

    const review = new reviewModel({
      user: req.user.id,
      movieId,
      ...req.body,
    });

    await review.save();

    responseHandler.created(res, {
      ...review._doc,
      id: review.id,
      user: req.user,
    });
  } catch {
    responseHandler.error(res);
  }
};

/**
 * Removes a review.
 *
 *
 * @param {Object} req - The request object from the client, containing the review ID.
 * @param {Object} res - The response object to send the response.
 * @returns {void}
 */

const remove = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await reviewModel.findOne({
      _id: reviewId,
      user: req.user.id,
    });

    if (!review) return responseHandler.notfound(res);

    await review.remove();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

/**
 * Retrieves all reviews created by the currently authenticated user.
 *
 *
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to send the response.
 * @returns {void}
 */

const getReviewsOfUser = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({
        user: req.user.id,
      })
      .sort("-createdAt");

    responseHandler.ok(res, reviews);
  } catch {
    responseHandler.error(res);
  }
};

export default { create, remove, getReviewsOfUser };
