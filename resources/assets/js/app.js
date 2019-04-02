import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';


import {store, history} from './store';
import Routes from './routes';
import 'antd-mobile/dist/antd-mobile.css';

if (document.getElementById('root')) {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Routes />
            </ConnectedRouter>
        </Provider>
        , document.getElementById('root'));
}