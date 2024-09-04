import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";

/**
 * Adds a media item to the user's favorites. If the item is already favorited, it returns the existing favorite.
 *
 * @param {Object} req - The request object from the client, containing the media item to be added to favorites.
 * @param {Object} res - The response object to send the response.
 * @returns {void}
 */
const addFavorite = async (req, res) => {
  try {
    // Check if the media item is already in the user's favorites
    const isFavorite = await favoriteModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });

    // If it's already a favorite, return the existing favorite
    if (isFavorite) return responseHandler.ok(res, isFavorite);

    // Otherwise, create a new favorite entry
    const favorite = new favoriteModel({
      ...req.body,
      user: req.user.id,
    });

    await favorite.save();

    // Respond with the newly created favorite
    responseHandler.created(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

/**
 * Removes a media item from the user's favorites.
 *
 * @param {Object} req - The request object from the client, containing the ID of the favorite to be removed.
 * @param {Object} res - The response object to send the response.
 * @returns {void}
 */
const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;

    // Find and remove the favorite item
    const favorite = await favoriteModel.findOne({
      user: req.user.id,
      _id: favoriteId,
    });

    // If the favorite item is not found, respond with not found error
    if (!favorite) return responseHandler.notfound(res);

    await favorite.remove();

    // Respond with success
    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

/**
 * Retrieves a list of favorite media items for the user.
 *
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to send the response.
 * @returns {void}
 */
const getFavoritesOfUser = async (req, res) => {
  try {
    // Retrieve and sort the user's favorite items
    const favorites = await favoriteModel
      .find({ user: req.user.id })
      .sort("-createdAt");

    responseHandler.ok(res, favorites);
  } catch {
    responseHandler.error(res);
  }
};

export default { addFavorite, removeFavorite, getFavoritesOfUser };
