import api from "./api";

const personEndpoints = {
  detail: ({ personId }) => `person/${personId}`,
  medias: ({ personId }) => `person/${personId}/medias`,
};

const personApi = {
  detail: async ({ personId }) => {
    try {
      const response = await api.get(personEndpoints.detail({ personId }));

      return { response };
    } catch (err) {
      return { err };
    }
  },
  medias: async ({ personId }) => {
    try {
      const response = await api.get(personEndpoints.medias({ personId }));

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default personApi;
