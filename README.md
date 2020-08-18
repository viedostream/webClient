# How to config

1. go to `src/environments`
1. copy `environment.sample.ts` file under the name `environment.ts`
1. open the file (we recommend vs-code for intel) and fill the empty parts

   ```typescript
   import { ENVIRONMENT_TYPE } from "./environment.type";

   export const environment: ENVIRONMENT_TYPE = {
     production: false,
     API_ENDPOINT: "",
     ZIXO_ENDPOINT: "",
     PEERJS_CONFIG: {
       host: "",
       secure: true,
       port: 443,
       path: "",
       // debug: 3
     },
     STREAM_CONFIG: {
       INVOICE_PRICE: 5000,
       DURATION_SECONDS: 5,
       CHANNEL_PRICE: 50000,
       CHANNEL_LOCK_SECONDS: 600,
     },
   };
   ```

1. save the file
1. copy file and paste under the name of `environment.prod.ts`
1. edit `environment.prod.ts` (we recommend vs-code)
1. change `production: false` to `production: true`
1. save and exit

# ZIXO

You can register and login with zixo wallet from this web client, you need to send some satooshi(test-net) to your wallet to use viedo.
