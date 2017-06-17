import React from 'react';
import ReactDOM from 'react-dom';
import styles from './assets/stylesheets/styles.less'; // This line cost me 2-3 hours of debugging. Without this the styles.css is not emitted by etract text web pack plugin
import App from './app/App.jsx';
console.log(App);
ReactDOM.render(<App />, document.getElementById('root'));