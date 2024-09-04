import express from "express";
import mediaController from "../controllers/media.controller.js";

const router = express.Router({ mergeParams: true });

/**
 * Route to search for media items based on a query.
 *
 * @route GET /search
 * @param {string} query - The search query parameter.
 * @param {string} page - The page number for pagination.
 * @returns {Object} - The search results.
 */

router.get("/search", mediaController.search);

/**
 * Route to get a list of media genres.
 *
 * @route GET /genres
 * @param {string} mediaType - The type of media (e.g., movie or tv).
 * @returns {Object} - The list of genres.
 */

router.get("/genres", mediaController.getGenres);

/**
 * Route to get detailed information about a specific media item.
 *
 * @route GET /detail/:mediaId
 * @param {string} mediaId - The ID of the media item.
 * @returns {Object} - Detailed information about the media item.
 */

router.get("/detail/:mediaId", mediaController.getDetail);

/**
 * Route to get a list of media items based on the media category.
 *
 * @route GET /:mediaCategory
 * @param {string} mediaCategory - The category of media (e.g., popular, top-rated).
 * @param {string} page - The page number for pagination.
 * @returns {Object} - The list of media items for the specified category.
 */

router.get("/:mediaCategory", mediaController.getList);

export default router;
