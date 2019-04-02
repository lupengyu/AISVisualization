import React from 'react';

import { Flex } from 'antd-mobile';
import "./style.css";

const title = ({ style, name }) => {
    return (
        <div className="xk-search__title" style={ style }>
            <Flex justify="center" align="center">
                <div className="xk-search__line"></div>
                <span className="xk-search__titleName">{ name }</span>
                <div className="xk-search__line"></div>
            </Flex>
        </div>
    )
};

export default title;