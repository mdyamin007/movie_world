import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../utils/tmdb/tmdb.api.js";

/**
 * Retrieves detailed information about a specific person.
 *
 * Fetches details about a person (e.g., actor or director) from the TMDB API
 * based on the provided `personId`. Responds with the person data if successful.
 *
 * @param {Object} req - The request object from the client, containing the person ID.
 * @param {Object} res - The response object to send the response.
 * @returns {void}
 */

const personDetail = async (req, res) => {
  try {
    const { personId } = req.params;

    const person = await tmdbApi.personDetail({ personId });

    responseHandler.ok(res, person);
  } catch {
    responseHandler.error(res);
  }
};

/**
 * Retrieves media associated with a specific person.
 *
 * Fetches movies or TV shows that the person (e.g., actor or director) has been
 * involved with from the TMDB API based on the provided `personId`. Responds
 * with the media data if successful.
 *
 * @param {Object} req - The request object from the client, containing the person ID.
 * @param {Object} res - The response object to send the response.
 * @returns {void}
 */

const personMedias = async (req, res) => {
  try {
    const { personId } = req.params;

    const medias = await tmdbApi.personMedias({ personId });

    responseHandler.ok(res, medias);
  } catch {
    responseHandler.error(res);
  }
};

export default { personDetail, personMedias };
