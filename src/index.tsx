import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SentryDSN } from '@/constants/env';

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: SentryDSN,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
