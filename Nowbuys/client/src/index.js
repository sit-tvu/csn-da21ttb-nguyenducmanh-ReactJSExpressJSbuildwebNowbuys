import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router } from 'react-router-dom'; 

import GlobalStyle from './Styles/GlobalStyle.js';

import GlobalUseContext from './context/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Router>
      <GlobalStyle>
        <GlobalUseContext>
          <App />
        </GlobalUseContext>
      </GlobalStyle>
    </Router>
  // </React.StrictMode>
)
reportWebVitals();
