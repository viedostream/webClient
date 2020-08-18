import { ENVIRONMENT_TYPE } from "./environment.type"

export const environment: ENVIRONMENT_TYPE = {
  production: false,
  API_ENDPOINT: "",
  ZIXO_ENDPOINT: "https://api.zixo.io/test/",
  PEERJS_CONFIG: {
    host: "",
    secure: true,
    port: 443,
    path: '',
    // debug: 3
  },
  STREAM_CONFIG: {
    INVOICE_AMOUNT: 1500,
    PAYMENT_PERIOD_DURATION_SECONDS: 5,
    CHANNEL_CREDIT: 50000,
    CHANNEL_LOCK_SECONDS: 3600
  }
};
