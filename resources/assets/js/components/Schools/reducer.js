import { SET_SCHOOL } from './actionTypes';

export default (state = {level: '本科生', school: '航空学院'}, action) => {
    switch (action.type) {
        case SET_SCHOOL: {
            const newState = Object.assign({}, state, {
                level: action.level,
                school: action.school
            });
            return newState;
        }
        default: {
            return state;
        }
    }
}