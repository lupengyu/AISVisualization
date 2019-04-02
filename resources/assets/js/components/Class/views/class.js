import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { setIndex } from '../actions';
import { Flex, Badge, WingBlank, WhiteSpace } from 'antd-mobile';
import "./style.css";

const getIndex = () => {
    return window.pageYOffset
        || document.documentElement.scrollTop
        || document.body.scrollTop
        || 0;
}

const ClassItem = ({ classData, onChange, setIndex, index }) => {
    return (
        <Link id={ 'class_item_js_' + index } to={ '/class/' + classData.id }
            onClick={() => { onChange('/class/' + classData.id); setIndex(getIndex()) }}
        >
            <WingBlank>
                <WhiteSpace size="lg" />
                <Flex className="xk-class">
                    <div className="xk-class__basic">
                        <h3>{ classData['课程名称'] }</h3>
                        <Flex>
                            <Flex.Item style={{ color: '#000', flex: 2 }}>
                                { classData['主讲教师'] }
                            </Flex.Item>
                            <Flex.Item className="xk-class__type">
                                <Badge text={ classData['课程类别'] && classData['课程类别'].length > 5
                                    ? classData['课程类别'].substr(0, 4) + '..'
                                    : classData['课程类别'] }
                                    style={{ 
                                        padding: '0 3px', 
                                        backgroundColor: '#fff', 
                                        borderRadius: 2, 
                                        border: '1px solid #e51c23',
                                        color: '#e51c23'
                                    }}
                                />
                            </Flex.Item>
                        </Flex>
                    </div>
                    <div className="xk-class__advance">
                        <Flex
                            direction="column"
                            justify="start"
                            align="start"
                            className="xk-class__info" >
                            <WingBlank>
                                <Badge text={ classData['学期'] }
                                    style={{ marginLeft: 6, padding: '0 3px', backgroundColor: '#e51c23', borderRadius: 2 }}
                                />
                                <Badge text={ !classData['起止周'] ? '未定周' :
                                    classData['起止周'][classData['起止周'].length - 1] === '周' 
                                        ? classData['起止周'] 
                                        : classData['起止周'] + '周' }
                                    style={{ marginLeft: 6, padding: '0 3px', backgroundColor: '#ff4081', borderRadius: 2 }}
                                />
                                <Badge text={ classData['学分'] + '学分' }
                                    style={{ marginLeft: 6, padding: '0 3px', backgroundColor: '#ff4081', borderRadius: 2 }}
                                />
                            </WingBlank>
                            <WhiteSpace />
                            <WingBlank>
                                <Badge text={ classData['dmtype'] ? classData['dmtype'] : '点名未知'}
                                    style={{ marginLeft: 6, padding: '0 3px', backgroundColor: '#ff4081', borderRadius: 2 }}
                                />
                                <Badge text={ classData['khtype'] ? classData['khtype'] : '考核未知'}
                                    style={{ marginLeft: 6, padding: '0 3px', backgroundColor: '#ff4081', borderRadius: 2 }}
                                />
                            </WingBlank>
                        </Flex>
                    </div>
                </Flex>
                <WhiteSpace size="lg" />
            </WingBlank>
        </Link>
    );
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

export default connect(null, mapDispathToProps)(ClassItem);