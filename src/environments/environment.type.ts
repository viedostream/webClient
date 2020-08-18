// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export type ENVIRONMENT_TYPE = {
  production: boolean,
  API_ENDPOINT: string,
  ZIXO_ENDPOINT: string,
  PEERJS_CONFIG: {
    host: string,
    secure: boolean,
    port: number,
    path: string,
    debug?: number,
    config?: any
  },
  STREAM_CONFIG: {
    INVOICE_PRICE: number,
    DURATION_SECONDS: number,
    CHANNEL_PRICE: number,
    CHANNEL_LOCK_SECONDS: number
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
