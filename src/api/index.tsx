import Klient from '@klient/core';

import '@klient/jwt';
import '@klient/rest';
import '@klient/mock';

import type { Parameters as KlientParameters } from '@klient/core';
import type { Parameters as JWTParameters, KlientExtended as JWTKlientExtended } from '@klient/jwt';
import type { Parameters as RestParameters, KlientExtended as RestKlientExtended } from '@klient/rest';
import type { Parameters as MockParameters, KlientExtended as MockKlientExtended } from '@klient/mock';

import { enableBrowserPersistance, resetBrowserData } from './mocks/data';

import PostResource from './resources/post';

type Parameters = KlientParameters & JWTParameters & RestParameters & MockParameters;
type ExtendedKlient = Klient & JWTKlientExtended & RestKlientExtended & MockKlientExtended;

//
// Build Klient instance
//
const klient = new Klient<Parameters>({
  //
  // Define API url
  //
  url: 'http://example.localhost',

  //
  // Initialize JWT config
  //
  jwt: {
    login: {
      url: '/auth',
      method: 'POST'
    },
    storage: {
      type: 'cookie',
      options: {
        name: 'klient-example',
        path: '/'
      }
    }
  }
}) as ExtendedKlient;

//
// Register REST Resources
//
klient.register(new PostResource());

//
// Setup mocks
//
require('./mocks').default(klient); // eslint-disable-line @typescript-eslint/no-var-requires

//
// DEBUGGING TOOLS
//
if (process.env.NODE_ENV === 'development') {
  // Enable
  klient.parameters.set('debug', true);
  // Check Klient in console
  console.log(klient); // eslint-disable-line no-console
  // Listen for dispatch
  klient.on('debug', console.log); // eslint-disable-line no-console
  // Attach Klien to window for manually test
  (window as any).klient = klient; // eslint-disable-line @typescript-eslint/no-explicit-any
  // Enable data persistance in browser storage
  enableBrowserPersistance(klient);
  // Set service for reset persisted data
  klient.services.set('resetter', {
    reset: resetBrowserData
  });
}

export default klient;
