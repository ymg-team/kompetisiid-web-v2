import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { APP_KEY } = publicRuntimeConfig;

import SealMiddleware from "seal-middleware";

const SM = new SealMiddleware(APP_KEY, 60000); //1 minutes

export default SM;
