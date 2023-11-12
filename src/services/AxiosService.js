import axios from "axios";

const axiosService = axios.create({
  baseURL: "/api/",
});

axiosService.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors
    if (error.response) {
      console.error("Data:", error.response.data);
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosService;
