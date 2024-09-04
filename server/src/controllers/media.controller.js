import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../utils/tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import jwtMiddleware from "../middleware/jwt.middleware.js";

/**
 * Retrieves a list of media items based on the provided media type, category, and page.
 *
 * @param {Object} req - The request object from the client, containing query parameters.
 * @param {Object} res - The response object to send the response.
 * @returns {void}
 */

const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;

    const response = await tmdbApi.mediaList({
      mediaType,
      mediaCategory,
      page,
    });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

/**
 * Retrieves a list of genres for the specified media type.
 *
 * @param {Object} req - The request object from the client, containing media type parameters.
 * @param {Object} res - The response object to send the response.
 * @returns {void}
 */

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    const response = await tmdbApi.mediaGenres({ mediaType });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

/**
 * Searches for media items based on the provided query and media type.
 *
 * @param {Object} req - The request object from the client, containing query and media type parameters.
 * @param {Object} res - The response object to send the response.
 * @returns {void}
 */

const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;

    const response = await tmdbApi.mediaSearch({
      query,
      page,
      mediaType: mediaType === "people" ? "person" : mediaType,
    });

    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

/**
 * Retrieves detailed information about a specific media item, including credits, videos, recommendations, and images.
 * Also checks if the media is marked as a favorite by the current user, if authenticated.
 *
 * @param {Object} req - The request object from the client, containing media type and ID parameters.
 * @param {Object} res - The response object to send the response.
 * @returns {void}
 */

const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;

    const params = { mediaType, mediaId };

    const media = await tmdbApi.mediaDetail(params);

    media.credits = await tmdbApi.mediaCredits(params);

    const videos = await tmdbApi.mediaVideos(params);

    media.videos = videos;

    const recommend = await tmdbApi.mediaRecommend(params);

    media.recommend = recommend.results;

    media.images = await tmdbApi.mediaImages(params);

    const tokenDecoded = jwtMiddleware.tokenDecode(req);

    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);

      if (user) {
        const isFavorite = await favoriteModel.findOne({
          user: user.id,
          mediaId,
        });
        media.isFavorite = isFavorite !== null;
      }
    }

    media.reviews = await reviewModel
      .find({ mediaId })
      .populate("user")
      .sort("-createdAt");

    responseHandler.ok(res, media);
  } catch (e) {
    console.log(e);
    responseHandler.error(res);
  }
};

export default { getList, getGenres, search, getDetail };
