import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './services/root-reducer';
// import {BrowserRouter} from "react-router-dom";
import {HashRouter} from 'react-router-dom'; //for Githhub
import type {} from 'redux-thunk/extend-redux';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
        {/*<BrowserRouter>*/}
        {/*    <App/>*/}
        {/*</BrowserRouter>*/}
    </Provider>
);

reportWebVitals();
