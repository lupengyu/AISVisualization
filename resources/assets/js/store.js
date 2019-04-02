import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import {reducer as schoolReducer} from './components/Schools';
import {reducer as filterReducer} from './components/Filter';
import {reducer as classReducer} from './components/Class';
import {reducer as userReducer} from './components/UserInfo';
import {reducer as commentReducer} from './components/Comment';

import {actions as classActions} from './components/Class';

const win = window;
const history = createHistory();

const reducer = combineReducers({
    school: schoolReducer,
    filter: filterReducer,
    class: classReducer,
    user: userReducer,
    comment: commentReducer,
    router: routerReducer
});

const middleware = routerMiddleware(history);

const storeEnhancers = compose(
    applyMiddleware(middleware, thunkMiddleware),
    (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

const store = createStore(reducer, {}, storeEnhancers);

function selectFilter(state) {
    return state.filter;
}

let currentValue;
function handleFilter() {
    let previousValue = currentValue;
    currentValue = selectFilter(store.getState());

    if (previousValue !== currentValue) {
        console.log(
            'Some changed from ',
            previousValue,
            'to',
            currentValue
        );
        // 清空已有数据
        store.dispatch(classActions.setStart({
            start: -10
        }));
        store.dispatch(classActions.setClasses({
            data: []
        }));
    }
}

function selectRouter(state) {
    return state.router.location.pathname;
}

let currentRouter;
function handleRouter() {
    let previousRouter = currentRouter;
    currentRouter = selectRouter(store.getState());

    if (previousRouter !== currentRouter) {
        configWX(shareId, function () {
            wx.ready(function () {
                wx.hideAllNonBaseMenuItem();
                wx.showMenuItems({
                    menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline']
                });
                wx.onMenuShareAppMessage(wxDataMessage);
                wx.onMenuShareTimeline(wxDataMessage);
            });
        });
        console.log('router change~');
    }
}

const unsubscribe = store.subscribe(handleFilter);
const routescribe = store.subscribe(handleRouter);

export {store, history};