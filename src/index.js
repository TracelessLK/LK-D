import React from 'react';
import ReactDOM from 'react-dom';
import './render/index.css';
import App from './render/App';
import * as serviceWorker from './render/serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
