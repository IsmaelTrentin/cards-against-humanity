import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';

const qClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={qClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
