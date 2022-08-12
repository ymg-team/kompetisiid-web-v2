import { fetchFeedCompetition } from "@services/feed";

const FeedCompetitionApi = async (req, res) => {
  const Response = await fetchFeedCompetition();
  res.setHeader("Content-Type", "text/xml");
  return res.status(200).send(Response);
};

export default FeedCompetitionApi;
