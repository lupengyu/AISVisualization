import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from './NotFound';
import Main from './Main';
import Select from './Select';
import Search from './Search';
import Info from './Info';
import Comment from './Comment';

import "./style.css";

const App = ({children}) => {
    return (
        <div>
            <Switch>
                <Route path='/main' component={Main} />
                <Route path='/select' component={Select} />
                <Route path='/search' component={Search} />
                <Route path='/class/:id' component={Info} />
                <Route path='/comment/:id' component={Comment} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
};

export default App;