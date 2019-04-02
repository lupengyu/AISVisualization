import React from 'react';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

const liStyle = {
    display: 'inline-block',
    margin: '10px 20px'
};

const view = ({onClick}) => {
    return (
        <div>
            <ul>
                <li style={liStyle}>
                    <Link to="/main" onClick={() => { onClick('/main') }}>Main</Link>
                </li>
                <li style={liStyle}>
                    <Link to="/select" onClick={() => { onClick('/select') }}>Select</Link>
                </li>
                <li style={liStyle}>
                    <Link to="/404" onClick={() => { onClick('/404') }}>404</Link>
                </li>
            </ul>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    onClick: (url) => {
        dispatch(push(url));
    }
});

export default connect(null, mapDispatchToProps)(view);