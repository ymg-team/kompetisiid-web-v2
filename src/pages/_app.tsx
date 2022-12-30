import React from "react";
import "~/public/static/style.css";
import type { AppProps } from "next/app";
import Head from "next/head";

// redux
import { Provider as ReduxProvider } from "react-redux";
import Store from "~/src/store/intializeStore";

const InitialStore = Store();

// layouts
import HomeLayoutV5 from "~/src/layouts/HomeLayoutV5";

function MyApp({ Component, pageProps, router }: AppProps) {
  const Layout = React.useMemo(() => {
    return HomeLayoutV5;
  }, []);

  const isFullScreen = React.useMemo(() => {
    return router.pathname === "/404";
  }, [router, pageProps]);

  return (
    <ReduxProvider store={InitialStore}>
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
      <Layout {...{ isFullScreen }}>
        <Component {...pageProps} />
      </Layout>
    </ReduxProvider>
  );
}

export default MyApp;
