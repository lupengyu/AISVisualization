import { SET_COMMENTS, SET_START, ADD_COMMENTS, RM_COMMENTS, SET_TIP } from './actionTypes';

export default (state = { data: [], start: -10, tip: true}, action) => {
    switch (action.type) {
        case SET_COMMENTS: {
            return Object.assign({}, state, {
                data: action.data
            });
        }
        case SET_START: {
            return Object.assign({}, state, {
                start: action.start
            });
        }
        case ADD_COMMENTS: {
            return Object.assign({}, state, {
                data: state.data.concat(action.data)
            });
        }
        case RM_COMMENTS: {
            const newState = state.data.filter(item => {
                return item.eid !== action.id;
            });
            return Object.assign({}, state, {
                data: newState
            })
        }
        case SET_TIP: {
            return Object.assign({}, state, {
                tip: action.tip
            })
        }
        default: {
            return state;
        }
    }
}