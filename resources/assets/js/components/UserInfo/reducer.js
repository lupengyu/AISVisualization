import { SET_USERINFO, SET_FAILURE } from './actionTypes';

export default (state= {
    openid: '',
    nickname: '公众号进入体验评价功能',
    headimgurl: 'https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg'
    }, action ) => {
    switch (action.type) {
        case SET_USERINFO: {
            return Object.assign({}, state,
                {
                    openid: action.openid,
                    nickname: action.nickname,
                    headimgurl: action.headimgurl
                }
            );
        }
        case SET_FAILURE: {
            return Object.assign({}, state,
                {
                    nickname: '错误用户'
                }
            );
        }
        default: {
            return state;
        }
    }
}