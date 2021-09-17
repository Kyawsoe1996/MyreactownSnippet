import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// for addto cart app
// import './add_to_cart.css'
//for post comment
import './posts.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet"/>

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
