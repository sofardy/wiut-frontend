import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './assets/styles/main.scss' // Global SCSS styles
import './index.css' // Global CSS styles
import reportWebVitals from './reportWebVitals';

// Get the root DOM element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main application component
root.render(
  <React.StrictMode> {/* Enables additional checks and warnings for development */}
    <BrowserRouter> {/* Enables client-side routing */}
      <App /> {/* The root component of the application */}
    </BrowserRouter>
  </React.StrictMode>
);

// Initialize performance monitoring
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
