import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: 'https://6d4cb3dace88448880bd68b93c90e5bb@o1343553.ingest.sentry.io/6618387',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
