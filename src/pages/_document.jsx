// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/static/images/icons-red/icon-128x128.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Raleway:400,500"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
          integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp"
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
      </body>
    </Html>
  );
}
