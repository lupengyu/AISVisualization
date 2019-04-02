import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { NavBar, Icon } from 'antd-mobile';
import Nav from './nav';
import './style.css';

const header = ({children, onChange}) => {
    return (
        <div className="xk-header">
            <NavBar mode="light"
                rightContent={<Link to="/search"><Icon type="search"/></Link>}>
                <Nav>{ children }</Nav>
            </NavBar>
        </div>
        
    )
};

const mapDispathToProps = (dispatch) => {
    return {
        onChange: (url) => {
            dispatch(push(url));
        }
    }
};

export default connect(null, mapDispathToProps)(header);