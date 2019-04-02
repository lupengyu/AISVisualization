import React from 'react';
import { connect } from 'react-redux';

import { Flex } from 'antd-mobile';
import {view as Schools} from '../components/Schools';
import {actions as userActions} from '../components/UserInfo';

function GetCode() {
    let url = window.location.search;
    if (url.indexOf('?') !== -1) {
        let str = url.substr(1);
        let strs = str.split('&');
        for (let i = 0; i < strs.length; i++) {
            if (strs[i].split('=')[0] === 'code') {
                return strs[i].split('=')[1];
            }
        }
    }
    return 0;
}

class Select extends React.Component {
    componentWillMount() {
        let code = GetCode();
        if (code !== 0) {
            console.log(code);
            this.props.getUserInfo(code);
        }
    }

    render() {
        return (
            <Flex className="xk-select" justify="center" aligan="center">
                <Schools />
            </Flex>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: (code) => {
            dispatch(userActions.getInfo(code));
        }
    }
};

export default connect(null, mapDispatchToProps)(Select);