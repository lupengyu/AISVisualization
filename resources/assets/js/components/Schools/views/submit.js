import React from 'react';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { setSchool } from '../actions';
import { Button } from 'antd-mobile';

const submitButton = ({onClick}) => {
    return (
        <Link to="/main/class">
            <Button type="primary" onClick={onClick}>登录</Button>
        </Link>
    );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
        dispatch(push('/main/class'))
        dispatch(setSchool({
            level: ownProps.level,
            school: ownProps.school
        }));
    }
});

export default connect(null, mapDispatchToProps)(submitButton);