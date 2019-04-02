/* @TIPS classinfo(用组件) + comments(other) */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { view as SearchTitle } from '../components/SearchTitle';
import { view as ClassInfo } from '../components/ClassInfo';
import { view as OtherComment } from '../components/OtherComment';
import { NavBar, Icon, Button, Modal,
    ListView, ActivityIndicator } from 'antd-mobile';

const alert =Modal.alert;

function GetState() {
    let url = window.location.search;
    if (url.indexOf('?') !== -1) {
        let str = url.substr(1);
        let strs = str.split('&');
        for (let i = 0; i < strs.length; i++) {
            if (strs[i].split('=')[0] === 'state') {
                return strs[i].split('=')[1];
            }
        }
    }
    return 0;
}

const showError = () => {
    const alertInstance = alert('无效的课程', '请勿随意输入地址', [
        { text: '返回首页', onPress: () => window.location.href = '/main/class' }
    ]);
};

const showNetError = () => {
    const alertInstance = alert('网络错误', '请检查网络连接后重试', [
        { text: '返回上一页', onPress: () => window.history.back() }
    ]);
};

class Info extends React.Component {
    constructor(...args) {
        super(...args);
        const newCommentsData = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        const hotCommentsData = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });

        this.state = {
            isLoading: true,
            class: {
                '课程名称': '加载中',
                '课程编号': '加载中',
                '课程类别': '加载中',
                '学时': '加载中',
                '学分': '加载中',
                '上课地点': '加载中',
                '学期': '加载中',
                '上课时间': '加载中',
                dmtype: '加载中',
                khtype: '加载中',
                zytype: '加载中',
                xgtype: '加载中'
            },
            newComments: [],
            hotComments: [],
            newCommentsData,
            hotCommentsData,
            noWechatModal: false
        };
        this.onLike = this.onLike.bind(this);
        this.showModal = this.showModal.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const apiUrl = `/api/classinfo/${id}`;

        fetch(apiUrl).then((response) => {
            if (response.status !== 200) {
                this.setState({
                    isLoading: false
                });
                throw new Error('Fail to get Class info');
            }

            response.json().then((responseJson) => {
                if (responseJson.code === 400) {
                    this.setState({
                        isLoading: false
                    });
                    throw new Error('Error id');
                }
                const classData = Object.assign({}, responseJson.class, {
                    dmtype: responseJson.dmtype,
                    khtype: responseJson.khtype,
                    zytype: responseJson.zytype,
                    xgtype: responseJson.xgtype
                });

                this.setState({
                    isLoading: false,
                    class: classData,
                    newCommentsData: this.state.newCommentsData.cloneWithRows(responseJson.newevaluate),
                    hotCommentsData: this.state.hotCommentsData.cloneWithRows(responseJson.hotevaluate),
                    newComments: responseJson.newevaluate,
                    hotComments: responseJson.hotevaluate
                })
            }).catch((error) => {
                showError();
            })
        }).catch((error) => {
            showNetError();
        })
    }

    onLike(id) {
        const newComments = this.state.newComments.map(item => {
            if (item.eid === id) {
                item['赞']++;
            }
            return item;
        });
        const hotComments = this.state.hotComments.map(item => {
            if (item.eid === id) {
                item['赞']++;
            }
            return item;
        });
        this.setState({
            newComments,
            hotComments,
            newCommentsData: this.state.newCommentsData.cloneWithRows(newComments),
            hotCommentsData: this.state.hotCommentsData.cloneWithRows(hotComments),
        }, () => {
            this.addzan(id);
        });
    }

    addzan(id) {
        const apiUrl = `/api/addzan/${id}`;

        fetch(apiUrl).then((response) => {
            response.json().then((responseJson) => {
                console.log(responseJson)
            }).catch((error) => {
                console.log(error);
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    showModal(e) {
        e.preventDefault();
        this.setState({
            noWechatModal: true
        });
    }

    onClose() {
        this.setState({
            noWechatModal: false
        });
    }

    goback() {
        if (GetState() === 'direct') {
            window.location.href = '/main/class'
        } else {
            window.history.go(-2);
        }
    }

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            return (
                <OtherComment
                    onLike={this.onLike}
                    comment={rowData}
                    key={rowID}
                />
            )
        };

        return (
            <div className="xk-info">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={this.goback}
                >{ this.state.class['课程名称'] }</NavBar>
                <ClassInfo classData={this.state.class} />
                <SearchTitle
                    style={{ marginTop: 16, marginBottom: 16 }}
                    name="最新评价"
                />
                { this.state.isLoading ?
                    <ActivityIndicator toast text="正在加载" /> :
                    ( this.state.newComments.length > 0 ?
                        <ListView
                            dataSource={this.state.newCommentsData}
                            renderRow={row}
                            renderSeparator={separator}
                            className="xk-comments"
                            useBodyScroll
                        /> :
                        <p style={{ textAlign: 'center' }}>来添加第一条评论吧</p>
                    )
                }
                {
                    !this.state.isLoading && this.state.hotComments.length > 0 ?
                        (
                            <div>
                                <SearchTitle
                                    style={{ marginTop: 16, marginBottom: 16 }}
                                    name="最热评价"
                                />
                                <ListView
                                    dataSource={this.state.hotCommentsData}
                                    renderRow={row}
                                    renderSeparator={separator}
                                    className="xk-comments"
                                    renderFooter={() => (
                                        <div style={{ padding: 16 }}></div>
                                    )}
                                    useBodyScroll
                                />
                            </div>
                        ) : null
                }
                {
                    this.props.isWechat ?
                        <Link className="xk-info__addbtn"
                              to={ '/comment/' + this.props.match.params.id }>
                            <Button type="primary">
                                添加课程评价
                            </Button>
                        </Link> :
                        <Button onClick={this.showModal} type="primary" className="xk-info__addbtn">
                            公众号进入即可评论
                        </Button>
                }
                <Modal
                    visible={ !this.props.isWechat && this.state.noWechatModal }
                    transparent
                    maskClosable={false}
                    title="关注梦之翼公众号"
                    footer={
                        [{ text: '确定', onPress: () => {
                            this.onClose();
                        }}]
                    }
                >
                    <img src="https://ng-1251513659.cos.ap-beijing.myqcloud.com/xuanke/qcode.jpg"  style={{ height: 120, width: 120 }}/>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isWechat: state.user.openid !== ""
});

export default connect(mapStateToProps)(Info);