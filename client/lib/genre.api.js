import api from "./api";

const genreEndpoints = {
  list: ({ mediaType }) => `${mediaType}/genres`,
};

const genreApi = {
  getList: async ({ mediaType }) => {
    try {
      const response = await api.get(genreEndpoints.list({ mediaType }));

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default genreApi;
