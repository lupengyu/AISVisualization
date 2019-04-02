import { SET_SCHOOL } from './actionTypes';

export const setSchool = ({level, school}) => ({
    type: SET_SCHOOL,
    level,
    school,
});