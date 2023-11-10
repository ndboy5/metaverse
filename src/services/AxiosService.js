import axios from "axios";

class AxiosService {
  constructor() {
    const instance = axios.create();
    instance.interceptors.request.use(this._handleRequest);
    instance.interceptors.response.use(this._handleResponse, this._handleError);
    this.instance = instance;
  }

  _handleRequest = (config) => {
    //TODO:  authentication token to the request headers for server connections
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
    }

    // Add Content-Type header for JSON data
    config.headers["Content-Type"] = "application/json";

    return config;
  };

  _handleResponse = (response) => {
    return response.data;
  };

  _handleError = (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      window.location.replace("/");
    }
    return Promise.reject(error.response.data);
  };

  get(url, params) {
    return this.instance.get(url, { params });
  }

  post(url, data) {
    return this.instance.post(url, data);
  }

  patch(url, data) {
    return this.instance.patch(url, data);
  }
}

export default new AxiosService();
