import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { setIndex } from '../../Class/actions';
import { Tabs } from 'antd-mobile';

const mapPathToPage = (path) => {
    if (path === '/main/class') {
        return 0;
    } else if (path === '/main/mine') {
        return 1;
    }

    return 0;
};

const Nav = ({ path, onChange, setIndex, children }) => {
    const page = mapPathToPage(path);

    const tabs = [
        { title: <Link to="/main/class" onClick={() => { onChange("/main/class"); setIndex(0) }}>选课</Link> },
        { title: <Link to="/main/mine" onClick={() => { onChange("/main/mine"); setIndex(0) }}>我的</Link> },
    ];

    return (
        <Tabs tabs={tabs} page={page}
              tabBarUnderlineStyle={
                {width: '20%', left: (15 + page * 50) + '%'}
              }
        >
            { children }
        </Tabs>
    )
};

const mapStateToProps = (state) => {
    return {
        path: state.router.location.pathname
    }
};

const mapDispathToProps = (dispatch) => {
    return {
        onChange: (url) => {
            dispatch(push(url));
        },

        setIndex: (index) => {
            dispatch(setIndex({ index: Number(index) }));
        }
    }
};

export default connect(mapStateToProps, mapDispathToProps)(Nav);