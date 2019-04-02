import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from './pages/Index';

const Routes = () => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

export default Routes;