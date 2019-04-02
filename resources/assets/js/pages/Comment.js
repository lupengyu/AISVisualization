/* @TIPS editinfo(用组件)(用组件是想编辑和添加用的是一个) */

import React from 'react';
import { connect } from 'react-redux';

import { actions as commentActions } from '../components/Comment';
import { view as SearchTitle } from '../components/SearchTitle';
import { NavBar, Icon, WhiteSpace, TextareaItem,
    Button, Flex, WingBlank, Modal, Toast } from 'antd-mobile';
import Radio from 'antd/lib/radio';
import 'antd/lib/radio/style/css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const alert =Modal.alert;

function successToast() {
    Toast.success('发布成功，等待审核', 2, () => {
        window.history.go(-1);
    });
}

function failToast() {
    Toast.fail('出现错误，请重试', 2);
}

function offlineToast() {
    Toast.offline('网络错误，请检查', 2);
}

class Comment extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            classname: '添加评价',
            check: '',
            test: '',
            works: '',
            effect: '',
            content: '',
            isPublic: true
        };
        this.onCheckChange = this.onCheckChange.bind(this);
        this.onTestChange = this.onTestChange.bind(this);
        this.onWorksChange = this.onWorksChange.bind(this);
        this.onEffectChange = this.onEffectChange.bind(this);
        this.onContentChange = this.onContentChange.bind(this);
        this.onPublicChange = this.onPublicChange.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }

    onCheckChange(e) {
        this.setState({
            check: e.target.value
        });
    }

    onTestChange(e) {
        this.setState({
            test: e.target.value
        });
    }

    onWorksChange(e) {
        this.setState({
            works: e.target.value
        });
    }

    onEffectChange(e) {
        this.setState({
            effect: e.target.value
        });
    }

    onContentChange(val) {
        this.setState({
            content: val
        });
    }

    onPublicChange(e) {
        this.setState({
            isPublic: e.target.value
        });
    }

    showAlert(data, id, user) {
        const alertInstance = alert('课程评价', '是否提交该评价?', [
            { text: '取消', onPress: () => console.log('取消'), style: 'defalut' },
            { text: '确认', onPress: () => this.submitComment(data, id, user) }
        ]);
    };

    submitComment(data, id, user) {
        const apiUrl = `/api/addcomment/${id}`;

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dmtype: data.check,
                khtype: data.test,
                zytype: data.works,
                xgtype: data.effect,
                isanonymous: data.isPublic,
                comment: data.content,
                openid: user.openid,
                nickname: user.nickanme,
                headimgurl: user.headimgurl
            })
        }).then((response) => {
            if (response.status !== 200) {
                throw new Error('Fail to set comment');
            }

            response.json().then((responseJson) => {
                if (responseJson.code === 200) {
                    successToast();
                    this.props.setStart(-10);
                } else {
                    failToast();
                }
            }).catch((error) => {
                failToast();
            })
        }).catch((error) => {
            offlineToast();
        })
    }

    render() {
        return (
            <div className="xk-edit">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { window.history.go(-1) }}
                >{ this.state.classname }</NavBar>
                <WhiteSpace size="xl" />
                <WingBlank>
                    <Flex className="xk-edit__item"
                        direction="column" align="start">
                        <Flex.Item>
                            <Flex>
                                <Flex.Item>
                                    点名方式
                                </Flex.Item>
                                <RadioGroup
                                    onChange={this.onCheckChange}
                                    defaultValue={this.state.check}>
                                    <RadioButton value="点名">点名</RadioButton>
                                    <RadioButton value="签到">签到</RadioButton>
                                    <RadioButton value="不点名不签到">不点名不签到</RadioButton>
                                </RadioGroup>
                            </Flex>
                        </Flex.Item>
                        <WhiteSpace />
                        <Flex.Item>
                            <Flex>
                                <Flex.Item>
                                    考核方式
                                </Flex.Item>
                                <RadioGroup
                                    onChange={this.onTestChange}
                                    defaultValue={this.state.test}>
                                    <RadioButton value="闭卷考试">闭卷考</RadioButton>
                                    <RadioButton value="开卷考试">开卷考</RadioButton>
                                    <RadioButton value="论文">论文</RadioButton>
                                    <RadioButton value="其他">其他</RadioButton>
                                </RadioGroup>
                            </Flex>
                        </Flex.Item>
                        <WhiteSpace />
                        <Flex.Item>
                            <Flex>
                                <Flex.Item>
                                    作业量
                                </Flex.Item>
                                <RadioGroup
                                    onChange={this.onWorksChange}
                                    defaultValue={this.state.works}>
                                    <RadioButton value="无作业">无作业</RadioButton>
                                    <RadioButton value="作业少">作业少</RadioButton>
                                    <RadioButton value="作业多">作业多</RadioButton>
                                </RadioGroup>
                            </Flex>
                        </Flex.Item>
                        <WhiteSpace />
                        <Flex.Item>
                            <Flex>
                                <Flex.Item>
                                    课堂效果
                                </Flex.Item>
                                <RadioGroup
                                    onChange={this.onEffectChange}
                                    defaultValue={this.state.effect}>
                                    <RadioButton value="棒">棒</RadioButton>
                                    <RadioButton value="一般">一般</RadioButton>
                                    <RadioButton value="糟糕">糟糕</RadioButton>
                                    <RadioButton value="没听过">没听过</RadioButton>
                                </RadioGroup>
                            </Flex>
                        </Flex.Item>
                    </Flex>
                </WingBlank>
                <SearchTitle
                    style={{ marginTop: 30, marginBottom: 16 }}
                    name="课程评价"
                />
                <WingBlank>
                    <TextareaItem
                        value={this.state.content}
                        onChange={this.onContentChange}
                        count={200}
                        rows={5}
                    />
                    <WhiteSpace size="sm" />
                    <div>
                        <RadioGroup
                            onChange={this.onPublicChange}
                            defaultValue={true}>
                            <Radio value={true}>公开</Radio>
                            <Radio value={false}>匿名</Radio>
                        </RadioGroup>
                    </div>
                    <WhiteSpace size="lg" />
                    <WhiteSpace size="lg" />
                    <WhiteSpace size="lg" />
                    <WhiteSpace size="lg" />
                </WingBlank>
                <Button
                    onClick={() => { this.showAlert(this.state, this.props.match.params.id, this.props.user) }}
                    type="primary"
                    className="xk-edit__submit">
                    提交
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: {
        nickanme: state.user.nickname,
        openid: state.user.openid,
        headimgurl: state.user.headimgurl
    }
});

const mapDispatchToProps = (dispatch) => ({
    setStart: (startIndex) => {
        dispatch(commentActions.setStart({
            start: startIndex
        }))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);