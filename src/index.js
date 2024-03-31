import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/root/App';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import 'filepond/dist/filepond.min.css';
import './public/css/channelDetail.css';
import './public/css/index.css';
import * as serviceWorker from './serviceWorker';
import { HistoryRouter as Router } from "redux-first-history/rr6";
import { Provider } from 'react-redux';
import { history, store } from "./redux/configureStore";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import "react-toastify/dist/ReactToastify.css";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

ReactDOM.render(<Provider store={store}><Router history={history}><App /></Router></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
