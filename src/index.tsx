import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: 'https://cff455d7b78644e887d6e7e0e79c195b@o252524.ingest.sentry.io/6616592',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
