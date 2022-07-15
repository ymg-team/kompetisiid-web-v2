/**
 * function to call api
 * @param {string} host , domain/host of service
 */
const apiCaller = async ({ host, endpoint, jsonBody }) => {
  new Promise((resolve) => {
    if (typeof fetch !== "undefined") {
      //time to fetch to services
    } else {
      // fetch api not available
      resolve({
        status: "500",
        message: "Fetch function not supported",
      });
    }
  });
};

export default apiCaller;
