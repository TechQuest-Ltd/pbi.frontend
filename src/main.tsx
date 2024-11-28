import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';

import { Toaster } from './components/ui/sonner.tsx';

import store from './redux/store.ts';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster
        toastOptions={{
          classNames: {
            error: 'text-red-600',
            success: 'text-green-600',
            warning: 'text-yellow-600',
            info: 'text-blue-600',
          },
        }}
      />
    </Provider>
  </React.StrictMode>
);
