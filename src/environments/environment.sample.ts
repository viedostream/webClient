import { ENVIRONMENT_TYPE } from "./environment.type"

export const environment: ENVIRONMENT_TYPE = {
  production: false,
  API_ENDPOINT: "",
  ZIXO_ENDPOINT: "",
  PEERJS_CONFIG: {
    host: "",
    secure: true,
    port: 443,
    path: '',
    // debug: 3
  },
  STREAM_CONFIG: {
    INVOICE_PRICE: 5000,
    DURATION_SECONDS: 5,
    CHANNEL_PRICE: 50000,
    CHANNEL_LOCK_SECONDS: 600
  }
};
