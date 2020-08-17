// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_ENDPOINT: "https://api.viedo.io/",
  ZIXO_ENDPOINT: "https://api.zixo.io/test/",
  PEERJS_CONFIG: {
    host: "peer.koalament.io",
    secure: true,
    port: 443,
    path: '/peerjs',
    // debug: 3
  },
  STREAM_CONFIG: {
    INVOICE_PRICE: 5000,
    DURATION_SECONDS: 5,
    CHANNEL_PRICE: 50000,
    CHANNEL_LOCK_SECONDS: 600
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
