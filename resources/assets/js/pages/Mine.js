/* @TIPS header + info(不用组件了） + comments(mine) */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { view as Comment } from '../components/Comment';
import { actions as commentActions } from '../components/Comment';
import { Card, WhiteSpace, Flex, Modal, Toast,
    Tabs, ListView, ActivityIndicator } from 'antd-mobile';
import CheckBox from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style/css';

const alert =Modal.alert;

const tabs = [
    { title: "已评价的课程" },
    { title: <Link to="/search" style={{ color: '#000' }}>评价新课程</Link>}
];

class Mine extends React.Component {
    constructor(...args) {
        super(...args);
        const commentsData = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });

        this.state = {
            isLoading: true,
            isContinue: false,
            isNull: false,
            isFull: false,
            moreModal: false,
            tipModal: false,
            more: {},
            commentsData
        };

        this.onDelete = this.onDelete.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
        this.showMore = this.showMore.bind(this);
        this.onClose = this.onClose.bind(this);
        this.showTip = this.showTip.bind(this);
        this.onTipClose = this.onTipClose.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        if (this.props.startIndex === -10) {
            this.props.getComments(0, this.props.openid);
        } else if (this.props.startIndex === -11) {
            this.setState({
                isLoading: false,
                isNull: true
            })
        } else {
            this.setState({
                commentsData: this.state.commentsData.cloneWithRows(this.props.comments),
                isLoading: false
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.comments !== nextProps.comments) {
            this.setState({
                commentsData: this.state.commentsData.cloneWithRows(nextProps.comments),
                isLoading: false
            })
        } else if (nextProps.startIndex === -11) {
            this.setState({
                isLoading: false,
                isNull: true
            })
        }

        if (this.props.startIndex === nextProps.startIndex) {
            this.setState({
                isContinue: false,
                isFull: true
            })
        }
    }

    onDelete(id) {
        const alertInstance = alert('课程评价', '是否确认删除该评价?', [
            { text: '取消', onPress: () => console.log('取消'), style: 'defalut' },
            { text: '确认', onPress: () => this.deleteComment(id, this.props.openid) }
        ]);
    }

    deleteComment(id, openid) {
        const apiUrl = `/api/deletecomment/${id}`;

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ openid: openid })
        }).then((response) => {
            if (response.status !== 200) {
                throw new Error('Fail to get comments');
            }

            response.json().then((responseJson) => {
                if (responseJson.code === 200) {
                    Toast.success('删除成功', 2);
                    this.props.rmComments(id);
                } else {
                    Toast.fail('删除失败', 2);
                }
            }).catch((error) => {
                console.log('error', error);
            })
        }).catch((error) => {
            console.log('big-error', error);
        })
    };

    onEndReached(event) {
        if (this.state.isContinue) {
            return;
        }
        this.setState({
            isContinue: true
        });
        this.props.getComments(this.props.startIndex, this.props.openid);
    }

    showMore(data) {
        this.setState({
            moreModal: true,
            more: data
        });
    }

    onClose() {
        this.setState({
            moreModal: false
        }, () => {
            this.setState({
                more: {}
            })
        });
    }

    showTip(data) {
        if (this.props.shouldTip) {
            this.setState({
                tipModal: true
            })
        }
        wxDataMessage.desc = `翻山越岭看${data['class_name']}课评`;
        wxDataMessage.link = `http://test.npuwings.com/class/${data['class_id']}?state=direct`;
    }

    onTipClose() {
        this.setState({
            tipModal: false
        })
    }

    onChange(e) {
        this.props.setTip({tip: !this.props.shouldTip});
    }

    render() {
        const header = (
            <Flex 
                style={{ width: '100%' }}
                direction="column" 
                justify="center" 
                align="center">
                <img alt="avatar" 
                    style={
                        { 
                            borderRadius: '50%', 
                            width: 42, 
                            height: 42,
                            margin: '10px 0'
                        }
                    }
                    src={ this.props.headimgurl } />
                <p style={{ margin: 0 }}>{ this.props.nickname }</p>
            </Flex>
        );

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
                <Comment
                    data={rowData}
                    onDelete={ () => { this.onDelete(rowData.eid) } }
                    showMore={ this.showMore }
                    showTip = { this.showTip }
                    key={rowID}
                />
            )
        };

        const loading = (
            <Flex direction="column" align="center" justify="center" style={{ margin:'30px 0'}}>
                <ActivityIndicator
                    size="large"
                />
                <span style={{ marginTop: 6 }}>加载中...</span>
            </Flex>
        );

        return (
            <div className="xk-mine">
                <Card className="xk-mine__info" full>
                    <Card.Header
                        thumb={ header }
                    />
                    <Card.Body>
                        <Tabs tabs={tabs} />
                    </Card.Body>
                </Card>
                <WhiteSpace />
                { this.state.isLoading ? loading : (
                    this.state.isNull ?
                        <h3 style={{ textAlign: 'center', marginTop: 10 }}>公众号进入体验评论功能</h3> : (
                            this.props.comments.length > 0 ? (
                                <ListView
                                    dataSource={this.state.commentsData}
                                    renderFooter={() => (
                                        <div style={{ textAlign: 'center'}}>
                                            { this.state.isContinue ? loading : ( this.state.isFull ? '加载完啦' : '点击继续加载' ) }
                                        </div>
                                    )}
                                    renderRow={row}
                                    renderSeparator={separator}
                                    className="xk-comments"
                                    pageSize={7}
                                    initialListSize={ this.props.startIndex * 10 }
                                    useBodyScroll
                                    scrollRenderAheadDistance={500}
                                    onEndReached={this.onEndReached}
                                    onEndReachedThreshold={300}
                                />
                            ) :
                            <h3 style={{ textAlign: 'center', marginTop: 10 }}>快去发表第一条评论吧</h3>
                    )
                ) }
                <Modal
                    visible={ this.state.moreModal }
                    transparent
                    maskClosable={false}
                    title={ this.state.more['class_name'] }
                    footer={
                        [{ text: '确定', onPress: () => {
                            this.onClose();
                        }}]
                    }
                >
                    <p>点名方式: { this.state.more['点名方式'] }</p>
                    <p>考核方式: { this.state.more['考核方式'] }</p>
                    <p>作业量: { this.state.more['作业量'] }</p>
                    <p>课堂效果: { this.state.more['课堂效果'] }</p>
                    <p>赞: { this.state.more['赞'] }个</p>
                </Modal>
                <Modal
                    visible={ this.state.tipModal }
                    transparent
                    maskClosable={true}
                    title="提示"
                    footer={
                        [{ text: '确定', onPress: () => {
                            this.onTipClose();
                        }}]
                    }
                >
                    <p>由于微信官方分享限制</p>
                    <p>点击该分享后会分享该课程链接</p>
                    <p>实际分享仍需通过右上角分享进行</p>
                    <CheckBox checked={!this.props.shouldTip}
                              onChange={this.onChange}>
                        本次浏览不再提示
                    </CheckBox>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    nickname: state.user.nickname,
    headimgurl: state.user.headimgurl,
    openid: state.user.openid,
    comments: state.comment.data,
    startIndex: state.comment.start,
    shouldTip: state.comment.tip
});

const mapDispatchToProps = (dispatch) => ({
    setStart: (startIndex) => {
        dispatch(commentActions.setStart({
            start: startIndex
        }))
    },

    rmComments: (id) => {
        dispatch(commentActions.rmComments({
            id
        }))
    },

    setComments: (data) => {
        dispatch(commentActions.setComments({
            data
        }))
    },

    getComments: (start, openid) => {
        dispatch(commentActions.getComments(start, openid));
    },

    setTip: (tip) => {
        dispatch(commentActions.setTip(tip));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Mine);