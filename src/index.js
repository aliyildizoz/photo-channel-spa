import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/root/App';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import 'font-awesome/css/font-awesome.min.css';
import 'filepond/dist/filepond.min.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux';
import configureStore from "./redux/configureStore";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
const store = configureStore();
ReactDOM.render(<BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
