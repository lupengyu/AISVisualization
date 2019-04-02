import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {view as Header} from '../components/Header';
import Class from './Class';
import Mine from './Mine';

const Main = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact
                    path='/main/class'
                    component={Class}
                />
                <Route exact
                    path='/main/mine'
                    component={Mine}
                />
            </Switch>
        </div>
    );
};

export default Main;