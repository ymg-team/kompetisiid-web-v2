import "~/public/static/style.140422.css"
import Head from "next/head";

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="fb:app_id" content="1419514554927551" />
        <meta property="fb:admins" content="xyussanx" />
        <meta property="fb:pages" content="309615952470901" />
        <meta
          name="google-signin-client_id"
          content="362573543654-djkou7th41pu964e7qs32ggogn1rbah6.apps.googleusercontent.com"
        />
        <meta
          name="google-site-verification"
          content="pUksy8ewwm4bzRVqaTQXKmWfRFZc9_L0iuESNDg7190"
        />
        <meta property="fb:app_id" content="1419514554927551" />
        <meta property="fb:admins" content="100000359263988" />
        <meta
          name="google-signin-client_id"
          content="825189798997-4gtj3pdnfpj2gvkvad6984emfg67kvec.apps.googleusercontent.com"
        />
      </Head>
  <Component {...pageProps} />
  </>
}

export default MyApp
