import fetchModule from "~/src/helpers/apiCaller";

/**
 * function to fetch competition categories
 * @returns
 */
export const fetchCompetitionCategories = () => {
  return fetchModule({
    endpoint: `/v2/maincategories`,
    method: "get",
  });
};
