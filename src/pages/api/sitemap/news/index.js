import { fetchSitemapNews } from "../../../../services/sitemap";

const SitemapNewsApi = async (req, res) => {
  const Response = await fetchSitemapNews();
  res.setHeader("Content-Type", "text/xml");
  return res.status(200).send(Response);
};

export default SitemapNewsApi;
