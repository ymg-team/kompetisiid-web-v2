import "~/public/static/style.140422.css"

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
  <Component {...pageProps} />
  </>
}

export default MyApp
