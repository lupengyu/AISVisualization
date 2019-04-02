import { SET_USERINFO, SET_FAILURE } from './actionTypes';

export const setInfo = ({openid, nickname, headimgurl}) => ({
    type: SET_USERINFO,
    openid,
    nickname,
    headimgurl
});

export const setFail = (error) => ({
    type: SET_FAILURE,
    error
});

export const getInfo = (code) => {
    return (dispatch) => {
        const apiUrl = `/weixinredirect?code=${code}&state=STATE`;

        return fetch(apiUrl).then((response) => {
            if (response.status !== 200) {
                throw new Error('Fail to get response');
            }

            response.json().then((responseJson) => {
                dispatch(setInfo(responseJson));
            }).catch((error) => {
                dispatch(setFail(error));
            })
        }).catch((error) => {
            dispatch(setFail(error));
        })
    }
};