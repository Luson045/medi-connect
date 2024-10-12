import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { inject } from '@vercel/analytics';
import { RecoilRoot } from 'recoil';
import ScrollProgressIndicator from './components/ScrollProgressIndicator';

inject();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ScrollProgressIndicator />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
);

reportWebVitals();
