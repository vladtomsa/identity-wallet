import axios from 'axios';

export const http = axios.create({
  baseURL: `${API_URL}/identity-api`,
});

export const blockchain = axios.create({
  baseURL: `${PERSONA_URL}/api`,
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error && error.response && error.response.data) {
      return Promise.reject(error.response.data.message ? error.response.data.message : error.response.data);
    } else {
      return Promise.reject({message: 'Server error'});
    }
  }
);

blockchain.interceptors.response.use(
  (response) => {
    if (response.data && !response.data.success) {
      if (response.data.error === 'Account not found') {
        return response.data;
      }

      return Promise.reject({message: response.data.error})
    }

    return response.data
  },
  (error) => {
    if (error && error.response && error.response.data) {
      return Promise.reject(error.response.data.message ? error.response.data.message : error.response.data);
    } else {
      return Promise.reject({message: 'Server error'});
    }
  }
);
