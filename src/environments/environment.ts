// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const CORS = 'https://cors-anywhere.herokuapp.com/';
export const environment = {
  production: false,
  mapbox: {
    accessToken: 'pk.eyJ1IjoiYWhtZWRpeiIsImEiOiJja2N3bDQ1dzQwMGlnMzVwZW11YmJudnB2In0.sPjpcFUzdk87zMtKJDsWIw'
  },
  // api_base_url: `${CORS}https://api.emzady.com`
  // api_base_url: `https://api.emzady.com`
  api_base_url: 'http://ecommerce-api.sdexegypt.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
