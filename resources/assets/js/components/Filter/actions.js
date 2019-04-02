import { SET_KIND, SET_SEASON, SET_TEST, SET_TIME, SET_SITE, SET_CHECK}from './actionTypes';

export const setKind = ({kind}) => ({
    type: SET_KIND,
    kind
});

export const setSeason = ({season}) => ({
    type: SET_SEASON,
    season
});

export const setTest = ({test}) => ({
    type: SET_TEST,
    test
});

export const setTime = ({time}) => ({
    type: SET_TIME,
    time
});

export const setSite = ({site}) => ({
    type: SET_SITE,
    site
});

export const setCheck = ({check}) => ({
    type: SET_CHECK,
    check
});
