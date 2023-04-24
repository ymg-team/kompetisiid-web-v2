// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { NODE_ENV, GOOGLE_ANALYTICS_ID } = publicRuntimeConfig;

export default function KIDocument() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/static/images/icons-red/icon-128x128.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Raleway:400,500&display=optional"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          href="/opensearch.xml"
          title="Cari Kompetisi"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="fb-root" />
        <script src="/static/script.0.0.2.min.js" async></script>
        {NODE_ENV === "production" && (
          <>
            <script
              async
              defer
              src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            ></script>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
              defer
            ></script>
            <script
              async
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${GOOGLE_ANALYTICS_ID}');`,
              }}
            ></script>
          </>
        )}
      </body>
    </Html>
  );
}

KIDocument.getInitialProps = async (ctx) => {
  const styledComponentsSheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;
  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => {
          return styledComponentsSheet.collectStyles(<App {...props} />);
        },
      });
    const initialProps = await Document.getInitialProps(ctx);
    initialProps.styles = [
      initialProps.styles,
      styledComponentsSheet.getStyleElement(),
    ];
    return initialProps;
  } finally {
    styledComponentsSheet.seal();
  }
};
