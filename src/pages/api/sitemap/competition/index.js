import { fetchSitemapCompetition } from "../../../../services/sitemap";

const FeedCompetitionApi = async (req, res) => {
  const Response = await fetchSitemapCompetition();
  res.setHeader("Content-Type", "text/xml");
  return res.status(200).send(Response);
};

export default FeedCompetitionApi;
