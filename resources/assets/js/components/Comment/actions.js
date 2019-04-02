import { SET_COMMENTS, SET_START, ADD_COMMENTS, RM_COMMENTS, SET_TIP } from './actionTypes';

export const setComments = (data) => ({
    type: SET_COMMENTS,
    data
});

export const addComments = (data) => ({
    type: ADD_COMMENTS,
    data
});

export const setStart = ({ start }) => ({
    type: SET_START,
    start
});

export const rmComments = ({ id }) => ({
    type: RM_COMMENTS,
    id
});

export const setTip = ({ tip }) => ({
    type: SET_TIP,
    tip
});

export const getComments = (start, openid) => {
    return (dispatch) => {
        const apiUrl = `/api/usercomment`;

        return fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ start: start, openid: openid })
        }).then((response) => {
            if (response.status !== 200) {
                throw new Error('Fail to get comments');
            }

            response.json().then((responseJson) => {
                console.log(responseJson);
                if (responseJson.code === 200) {
                    if (start === 0) {
                        dispatch(setComments(responseJson.comments));
                    } else {
                        dispatch(addComments(responseJson.comments));
                    }
                    dispatch(setStart({ start: responseJson.start }))
                } else if (responseJson.code === 400) {
                    throw new Error('user is null');
                }
            }).catch((error) => {
                console.log('error', error);
                dispatch(setStart({ start: -11 }))
            })
        }).catch((error) => {
            console.log('big-error', error);
        })
    }
}