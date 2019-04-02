import { SET_CLASSES, SET_START, ADD_CLASSES, SET_INDEX } from './actionTypes';

export default (state = { data: [], start: 0, index: -1 }, action) => {
    switch (action.type) {
        case SET_CLASSES: {
            const newState = Object.assign({}, state, {
                data: action.data
            });
            return newState;
        }
        case SET_START: {
            const newState = Object.assign({}, state, {
                start: action.start
            });
            return newState;
        }
        case ADD_CLASSES: {
            const newState = Object.assign({}, state, {
                data: state.data.concat(action.data)
            });
            return newState;
        }
        case SET_INDEX: {
            return Object.assign({}, state, {
                index: action.index
            });
        }
        default: {
            return state;
        }
    }
}