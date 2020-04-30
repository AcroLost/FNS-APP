import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppContainerWithRouter from './AppContainer';

ReactDOM.render(
    <BrowserRouter>
        <AppContainerWithRouter />
    </BrowserRouter>,
    document.getElementById('root'));