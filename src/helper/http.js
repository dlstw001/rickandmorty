import axios from "axios";

const resParser = (res) => res.data;
const errParse = (err) => err.data;

class http {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API,
      timeout: 5000,
    });
    this.axiosInstance.interceptors.response.use(
      (data) => {
        return data;
      },
      async (err) => {
        switch (err.response.status) {
          case 404:
          case 400:
          case 403:
          case 500:
            return Promise.reject(err.response);
        }
      },
    );
  }

  get = (url, params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(url, params)
        .then((res) => resolve(resParser(res)))
        .catch((err) => reject(errParse(err)));
    });
  };

  post = (url, params, options) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post(url, params, options)
        .then((res) => resolve(resParser(res)))
        .catch((err) => reject(errParse(err)));
    });
  };

  put = (url, params, options) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .put(url, params, options)
        .then((res) => resolve(resParser(res)))
        .catch((err) => reject(errParse(err)));
    });
  };

  delete = (url, params, options) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .delete(url, params, options)
        .then((res) => resolve(resParser(res)))
        .catch((err) => reject(errParse(err)));
    });
  };
}

export default new http();