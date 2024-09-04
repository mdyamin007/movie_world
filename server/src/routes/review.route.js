import express from "express";
import { body } from "express-validator";
import reviewController from "../controllers/review.controller.js";
import tokenMiddleware from "../middleware/jwt.middleware.js";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router({ mergeParams: true });

/**
 * Route to get all reviews of the authenticated user.
 *
 * @route GET /
 * @middleware tokenMiddleware.auth - Middleware to authenticate the user.
 * @returns {Array} - List of reviews created by the authenticated user.
 */
router.get("/", tokenMiddleware.auth, reviewController.getReviewsOfUser);

/**
 * Route to create a new review.
 *
 * @route POST /
 * @middleware tokenMiddleware.auth - Middleware to authenticate the user.
 * @middleware requestHandler.validate - Middleware to validate the request body.
 * @body {string} mediaId - The ID of the media being reviewed.
 * @body {string} content - The content of the review.
 * @body {string} mediaType - The type of media (e.g., "movie" or "tv").
 * @body {string} mediaTitle - The title of the media.
 * @body {string} mediaPoster - The poster image URL of the media.
 * @returns {Object} - The created review including user information.
 */
router.post(
  "/",
  tokenMiddleware.auth,
  body("mediaId")
    .exists()
    .withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("mediaId can not be empty"),
  body("content")
    .exists()
    .withMessage("content is required")
    .isLength({ min: 1 })
    .withMessage("content can not be empty"),
  body("mediaType")
    .exists()
    .withMessage("mediaType is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("mediaType invalid"),
  body("mediaTitle").exists().withMessage("mediaTitle is required"),
  body("mediaPoster").exists().withMessage("mediaPoster is required"),
  requestHandler.validate,
  reviewController.create
);

/**
 * Route to delete a review by its ID.
 *
 * @route DELETE /:reviewId
 * @middleware tokenMiddleware.auth - Middleware to authenticate the user.
 * @param {string} reviewId - The ID of the review to be deleted.
 * @returns {void} - Status indicating the deletion result.
 */
router.delete("/:reviewId", tokenMiddleware.auth, reviewController.remove);

export default router;
