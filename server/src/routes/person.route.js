import express from "express";
import personController from "../controllers/person.controller.js";

const router = express.Router({ mergeParams: true });

/**
 * Route to get media items associated with a specific person.
 *
 * @route GET /:personId/medias
 * @param {string} personId - The ID of the person.
 * @returns {Object} - The list of media items associated with the person.
 */

router.get("/:personId/medias", personController.personMedias);

/**
 * Route to get detailed information about a specific person.
 *
 * @route GET /:personId
 * @param {string} personId - The ID of the person.
 * @returns {Object} - Detailed information about the person.
 */

router.get("/:personId", personController.personDetail);

export default router;
