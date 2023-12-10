import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router } from 'react-router-dom'; 

import { GlobalStyles } from './Components/index.js';

import GlobalUseContext from './context/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <GlobalStyles>
      <GlobalUseContext>
        <App />
      </GlobalUseContext>
    </GlobalStyles>
  </Router>
)
reportWebVitals();
