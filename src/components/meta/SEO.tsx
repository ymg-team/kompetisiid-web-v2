import Head from "next/head";
import { SEOProps } from "./interfaces";

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = "https://res.cloudinary.com/dhjkktmal/image/upload/v1528851826/kompetisi-id/email_assets/icon-512x512.png",
  url = "https://kompetisi.id",
  jsonLd,
  children,
  keyword = "kompetisi, lomba, kompetisi online, lomba online, kuis, kuis online",
}: SEOProps) => {
  const NewTitle = title ? `${title} - Kompetisi Id` : "Kompetisi Id";
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{NewTitle}</title>
      <meta name="title" content={NewTitle} />
      <meta name="description" content={description} />
      <meta name="keyword" content={keyword} />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={NewTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}

      {children}
    </Head>
  );
};

export default SEO;
