import React from 'react';
import ReactDOM from 'react-dom';
import './assets/stylesheets/styles.less'; // This line cost me 2-3 hours of debugging. Without this the styles.css is not emitted by etract text web pack plugin
import App from './app/App';

ReactDOM.render(<App />, document.getElementById('root')); // eslint-disable-line react/jsx-filename-extension
