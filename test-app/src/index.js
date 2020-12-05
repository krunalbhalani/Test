import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import allReducers from './reducers';
import App from './containers/App';
import createSagaMiddleware from 'redux-saga'
import Saga from './sagas'
import { BrowserRouter } from 'react-router-dom'
import './scss/style.scss'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    allReducers,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(Saga);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

