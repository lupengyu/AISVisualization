import { SET_KIND, SET_SEASON, SET_TEST, SET_TIME, SET_SITE, SET_CHECK}from './actionTypes';

export default (state = {kind: '', season: '', test: '', time: '', site: '', check: ''}, action) => {
    switch (action.type) {
        case SET_KIND: {
            const newState = Object.assign({}, state, {
                kind: action.kind
            });
            return newState;
        }
        case SET_SEASON: {
            const newState = Object.assign({}, state, {
                season: action.season
            });
            return newState;
        }
        case SET_TEST: {
            const newState = Object.assign({}, state, {
                test: action.test
            });
            return newState;
        }
        case SET_TIME: {
            const newState = Object.assign({}, state, {
                time: action.time
            });
            return newState;
        }
        case SET_SITE: {
            const newState = Object.assign({}, state, {
                site: action.site
            });
            return newState;
        }
        case SET_CHECK: {
            const newState = Object.assign({}, state, {
                check: action.check
            });
            return newState;
        }
        default: {
            return state;
        }
    }
}