import { fetchFeedNews } from "@services/feed";

const FeedNewsApi = async (req, res) => {
  const Response = await fetchFeedNews();
  res.setHeader("Content-Type", "text/xml");
  return res.status(200).send(Response);
};

export default FeedNewsApi;
