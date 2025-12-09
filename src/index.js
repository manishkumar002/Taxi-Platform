import React from 'react';
import ReactDOM from 'react-dom';
import 'animate.css/animate.min.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import reportWebVitals from './reportWebVitals';
import './fonts/Cera-bold.otf';
import './fonts/CeraProRegular.otf';
import './fonts/CeraProMedium.otf';
import './fonts/CeraProBlack.otf';
import { AlertProviders } from './Context/AlertsPopusContext';
import { SwapProviders } from './Context/SwapContext';
import { LoginProviders } from './Context/ShowLoginPopup';



ReactDOM.render(
  <>
  <BrowserRouter>
   <HelmetProvider>
   <AlertProviders>
     <LoginProviders>
        <SwapProviders>
         <App />
        </SwapProviders>
     </LoginProviders>
     </AlertProviders>
     </HelmetProvider>
  </BrowserRouter>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
