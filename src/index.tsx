import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { SentryDSN } from '@/constants/env';

Sentry.init({
  dsn: SentryDSN,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
