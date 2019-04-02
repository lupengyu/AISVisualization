import React from 'react';

import { Card, Flex, Badge, WingBlank, WhiteSpace } from 'antd-mobile';
import "./style.css";

const ClassInfo = ({ classData }) => {
    return (
        <div>
            <Card full>
                <Card.Body>
                    <WingBlank size="md">
                        <Flex className="xk-classinfo"
                              jusitfy="start"
                              align="start"
                        >
                            <Flex.Item className="xk-classinfo__basic" style={{ flex: 3 }}>
                                <Flex direction="column"
                                      justify="start" align="start">
                                    <Flex.Item>
                                        <p className="xk-classinfo__item">
                                            <span className="xk-classinfo__tag">编号</span>
                                            { classData['课程编号'] }
                                        </p>
                                    </Flex.Item>
                                    <Flex.Item>
                                        <p className="xk-classinfo__item">
                                            <span className="xk-classinfo__tag">类别</span>
                                            { classData['课程类别'] }
                                        </p>
                                    </Flex.Item>
                                    <Flex.Item>
                                        <p className="xk-classinfo__item">
                                            <span className="xk-classinfo__tag">学时</span>
                                            { classData['学时'] }
                                        </p>
                                    </Flex.Item>
                                    <Flex.Item>
                                        <p className="xk-classinfo__item">
                                            <span className="xk-classinfo__tag">学分</span>
                                            { classData['学分'] }
                                        </p>
                                    </Flex.Item>
                                </Flex>
                            </Flex.Item>
                            <Flex.Item style={{ flex: 2 }}>
                                <Badge text={ classData.dmtype === '' ? '点名未知' : classData.dmtype }
                                       style={{ marginLeft: 8, padding: '0 3px', backgroundColor: '#ff4081', borderRadius: 2 }}
                                />
                                <Badge text={ classData.khtype === '' ? '考核未知' : classData.khtype }
                                       style={{ marginLeft: 8, padding: '0 3px', backgroundColor: '#ff4081', borderRadius: 2 }}
                                />
                                <Badge text={ classData.zytype === '' ? '作业未知' : ('作业' + classData.zytype) }
                                       style={{ marginLeft: 8, padding: '0 3px', backgroundColor: '#ff4081', borderRadius: 2 }}
                                />
                                <Badge text={ classData.xgtype === '' ? '效果未知' : classData.xgtype }
                                       style={{ marginLeft: 8, padding: '0 3px', backgroundColor: '#ff4081', borderRadius: 2 }}
                                />
                            </Flex.Item>
                        </Flex>
                    </WingBlank>
                </Card.Body>
            </Card>
            <WhiteSpace />
            <Card full>
                <Card.Body>
                    <WingBlank size="md">
                        <Flex className="xk-classinfo__subinfo">
                            <Flex.Item style={{ flex: 2 }}>
                                <Flex direction="column" align="start">
                                    <p className="xk-classinfo__item">开课地点</p>
                                    <p className="xk-classinfo__item">学期</p>
                                </Flex>
                            </Flex.Item>
                            <Flex.Item style={{ flex: 3 }}>
                                <Flex direction="column" align="start">
                                    <p className="xk-classinfo__item">{ classData['上课地点'] }</p>
                                    <p className="xk-classinfo__item">{ classData['学期'] }</p>
                                </Flex>
                            </Flex.Item>
                        </Flex>
                    </WingBlank>
                </Card.Body>
            </Card>
        </div>
    )
};

export default ClassInfo;