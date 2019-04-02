import React from 'react';
import MySelect from './select';
import Submit from './submit';

import { Flex, WhiteSpace, WingBlank } from 'antd-mobile';
import './style.css';

// @TODO 院系完成，专业不完整（研究生/本科生）
const levels = ['本科生', '研究生'];
const schools = ['航空学院', '航天学院', '航海学院', '材料学院',
    '机电学院', '力学与土木建筑学院', '动力与能源学院',
    '电子信息学院', '自动化学院', '计算机学院', '理学院',
    '管理学院', '人文与经法学院', '软件与微电子学院', '生命学院',
    '外国语学院', '教育实验学院', '国际教育学院', '保密学院',
    '马克思主义学院', '玛丽女王工程学院'];

class School extends React.Component {
    constructor () {
        super(...arguments);
        this.state = {
            level: '本科生',
            school: '航空学院'
        };
        this.onChangeLevel = this.onChangeLevel.bind(this);
        this.onChangeSchool = this.onChangeSchool.bind(this);
    }

    onChangeSchool (value) {
        this.setState({
            school: value
        });
    }

    onChangeLevel (value) {
        this.setState({
            level: value
        });
    }

    render () {
        return (
            <WingBlank className="xk-select__container">
                <Flex justify="start">
                    <span className="xk-select__label">学历</span>
                    <MySelect value={this.state.level} data={levels} onChange={this.onChangeLevel} />
                </Flex>
                <WhiteSpace />
                <Flex justify="start">
                    <span className="xk-select__label">学院</span>
                    <MySelect value={this.state.school} data={schools} onChange={this.onChangeSchool} />
                </Flex>
                <WhiteSpace size="xl" />
                <Submit school={this.state.school} level={this.state.level}/>
            </WingBlank>
        );
    }
}

export default School;