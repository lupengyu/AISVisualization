import React from 'react';

import FilterMenu from './menu';
import { Flex, WingBlank } from 'antd-mobile';
import "./style.css";

const initData = {
    kind: [
        {value: '', label: '无限制'},
        {value: '专业基础', label: '专业基础课'},
        {value: '专业核心', label: '专业核心课'},
        {value: '专业课', label: '专业课'},
        {value: '专业选修', label: '专业选修课'},
        {value: '体育', label: '体育课'},
        {value: '大学英语', label: '大学英语公共课'},
        {value: '集中实践', label: '集中实践课'},
        {value: '其他', label: '其他'}
    ],
    season: [
        {value: '', label: '无限制'},
        {value: '春学期', label: '春季学期'},
        {value: '秋学期', label: '秋季学期'}
    ],
    site: [
        {value: '', label: '无限制'},
        {value: '友谊', label: '友谊校区'},
        {value: '长安', label: '长安校区'}
    ],
    check: [
        {value: '', label: '无限制'},
        {value: '点名', label: '点名'},
        {value: '签到', label: '签到'}
    ],
    test: [
        {value: '', label: '无限制'},
        {value: '闭卷考试', label: '闭卷考试'},
        {value: '开卷考试', label: '开卷考试'},
        {value: '论文', label: '论文'},
        {value: '其他', label: '其他'}
    ]
};

class Filter extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            type: "",
            show: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.onMaskClick = this.onMaskClick.bind(this);
    }

    handleClick(type, e) {
        e.preventDefault();
        // 如果类型改变，说明换了一个点击
        if (type !== this.state.type) {
            this.setState({
                type,
                show: true
            });
        } else {
            this.setState({
                show: !this.state.show
            });
        }
    }

    onMaskClick() {
        // 延迟 300 ms 防止点击穿透
        setTimeout(() => {
            this.setState({
                show: false
            });
        }, 300);
    }

    render() {
        const { show, type } = this.state;
        const menuEl = (
            <FilterMenu type={type} data={initData[type]} />
        )
        return (
            <div className="xk-filter">
                <WingBlank size="sm">
                    <Flex>
                        <Flex.Item
                            className={[
                                type === 'kind' && show ? 'is-active' : '',
                                'xk-filter__item'
                            ]}
                            onClick={(ev) => {this.handleClick('kind', ev)}}>
                            <div>类别</div>
                        </Flex.Item>
                        <Flex.Item
                            className={[
                                type === 'season' && show ? 'is-active' : '',
                                'xk-filter__item'
                            ]}
                            onClick={(ev) => {this.handleClick('season', ev)}}>
                            <div>学期</div>
                        </Flex.Item>
                        <Flex.Item
                            className={[
                                type === 'site' && show ? 'is-active' : '',
                                'xk-filter__item'
                            ]}
                            onClick={(ev) => {this.handleClick('site', ev)}}>
                            <div>校区</div>
                        </Flex.Item>
                        <Flex.Item
                            className={[
                                type === 'check' && show ? 'is-active' : '',
                                'xk-filter__longitem'
                            ]}
                            onClick={(ev) => {this.handleClick('check', ev)}}>
                            <div>点名方式</div>
                        </Flex.Item>
                        <Flex.Item
                            className={[
                                type === 'test' && show ? 'is-active' : '',
                                'xk-filter__longitem'
                            ]}
                            onClick={(ev) => {this.handleClick('test', ev)}}>
                            <div>考核方式</div>
                        </Flex.Item>
                    </Flex>
                </WingBlank>
                { show ? menuEl : null}
                { show ? <div className="xk-filter__mask" onClick={this.onMaskClick} onTouchStart={this.onMaskClick} /> : null}
            </div>
        );
    }
}

export default Filter;