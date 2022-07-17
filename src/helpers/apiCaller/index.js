import fetchModule from "./fetch";
/**
 * function to call api
 */
const apiCaller = (args) => {
  return fetchModule(args);
};

export default apiCaller;
