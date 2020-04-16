import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AppContainer from './App';

ReactDOM.render(
    <BrowserRouter>
        <AppContainer />
    </BrowserRouter>,
    document.getElementById('root'));