export const API_SERVER_URL = import.meta.env.VITE_API_URL;

const apiServerClient = {
  fetch: async (url, options = {}) => {
    return fetch(`${API_SERVER_URL}${url}`, options);
  },
};

export default apiServerClient;