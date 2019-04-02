import { SET_CLASSES, SET_START, ADD_CLASSES, SET_INDEX } from './actionTypes';

export const setClasses = (data) => ({
    type: SET_CLASSES,
    data
});

export const addClasses = (data) => ({
    type: ADD_CLASSES,
    data
});

export const setStart = ({ start }) => ({
    type: SET_START,
    start
});

export const setIndex = ({ index }) => ({
    type: SET_INDEX,
    index
});

export const getClasses = (paras = { type, college, education, time, place, dmtype, khtype, term, start}) => {
    return (dispatch) => {
        const apiUrl = `/api/classlist`;

        return fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paras)
        }).then((response) => {
            if (response.status !== 200) {
                throw new Error('Fail to get class');
            }

            response.json().then((responseJson) => {
                for (let i = 0; i < responseJson.cnt; i++) {
                    responseJson.lists[i].dmtype = responseJson.dmtype[i];
                    responseJson.lists[i].khtype = responseJson.khtype[i];
                }
                console.log(responseJson);
                if (paras.start === 0) {
                    dispatch(setClasses(responseJson.lists));
                } else {
                    dispatch(addClasses(responseJson.lists));
                }
                dispatch(setStart({ start: responseJson.start }));
            }).catch((error) => {
                console.log("error", error);
            })
        }).catch((error) => {
            console.log("big-error", error);
        })
    }
};