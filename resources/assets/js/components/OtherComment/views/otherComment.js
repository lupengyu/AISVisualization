import React from 'react';

import { Flex } from 'antd-mobile';
import './style.css';

class OtherComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClap: false
        };

        this.clap = this.clap.bind(this);
    }

    clap() {
        if (!this.state.isClap) {
            this.setState({
                isClap: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        isClap: false
                    })
                }, 360)
            });
        }
    }

    render() {
        const comment = this.props.comment;
        const onLike = this.props.onLike;

        return (
            <Flex>
                <img src={ comment.headimgurl ? comment.headimgurl: 'https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg' } alt="avatar" className="xk-ocomment__avatar" />
                <Flex.Item className="xk-ocomment__content">
                    <Flex direction="column" align="start">
                        <Flex justify="between" className="xk-ocomment__item">
                            <Flex.Item>
                                <p>{ comment['user_name'] }</p>
                                <p style={{ color: '#888' }}>{ comment.time }</p>
                            </Flex.Item>
                            <Flex align="center"
                                  onClick={ () => { onLike(comment.eid); this.clap(); } }
                                  style={{ marginRight: 10 }}>
                                <div>
                                    {
                                        this.state.isClap ?
                                            (
                                                <div className="clapContent">
                                                    <div style={{ animation: 'burst-dot 370ms ease-out 1 running' }}>
                                                        <div className="clapRadial clapRadial--dot" style={{ transform: 'rotate(104.52311605949019deg)' }}></div>
                                                        <div className="clapRadial clapRadial--dot" style={{ transform: 'rotate(176.52311605949018deg)' }}></div>
                                                        <div className="clapRadial clapRadial--dot" style={{ transform: 'rotate(248.52311605949018deg)' }}></div>
                                                        <div className="clapRadial clapRadial--dot" style={{ transform: 'rotate(320.5231160594902deg)' }}></div>
                                                        <div className="clapRadial clapRadial--dot" style={{ transform: 'rotate(392.5231160594902deg)' }}></div></div>
                                                    <div style={{ animation: 'burst-triangle 370ms ease-out 1 running' }}>
                                                        <div className="clapRadial clapRadial--triangle" style={{ transform: 'rotate(117.52311605949019deg)' }}></div>
                                                        <div className="clapRadial clapRadial--triangle" style={{ transform: 'rotate(189.52311605949018deg)' }}></div>
                                                        <div className="clapRadial clapRadial--triangle" style={{ transform: 'rotate(261.5231160594902deg)' }}></div>
                                                        <div className="clapRadial clapRadial--triangle" style={{ transform: 'rotate(333.5231160594902deg)' }}></div>
                                                        <div className="clapRadial clapRadial--triangle" style={{ transform: 'rotate(405.5231160594902deg)' }}></div>
                                                    </div>
                                                </div>
                                            ) : null
                                    }
                                </div>
                                <svg width="20" height="20" viewBox="0 0 25 25"
                                     style={{ marginRight: 4 }} fill="#108ee9">
                                    <g fillRule="evenodd">
                                        <path d="M11.738 0l.762 2.966L13.262 0z"></path>
                                        <path d="M16.634 1.224l-1.432-.47-.408 3.022z"></path>
                                        <path d="M9.79.754l-1.431.47 1.84 2.552z"></path>
                                        <path d="M22.472 13.307l-3.023-5.32c-.287-.426-.689-.705-1.123-.776a1.16 1.16 0 0 0-.911.221c-.297.231-.474.515-.535.84.017.022.036.04.053.063l2.843 5.001c1.95 3.564 1.328 6.973-1.843 10.144a8.46 8.46 0 0 1-.549.501c1.205-.156 2.328-.737 3.351-1.76 3.268-3.268 3.041-6.749 1.737-8.914"></path>
                                        <path d="M12.58 9.887c-.156-.83.096-1.569.692-2.142L10.78 5.252c-.5-.504-1.378-.504-1.879 0-.178.18-.273.4-.329.63l4.008 4.005z"></path>
                                        <path d="M15.812 9.04c-.218-.323-.539-.55-.88-.606a.814.814 0 0 0-.644.153c-.176.137-.713.553-.24 1.566l1.43 3.025a.539.539 0 1 1-.868.612L7.2 6.378a.986.986 0 1 0-1.395 1.395l4.401 4.403a.538.538 0 1 1-.762.762L5.046 8.54 3.802 7.295a.99.99 0 0 0-1.396 0 .981.981 0 0 0 0 1.394L3.647 9.93l4.402 4.403a.537.537 0 0 1 0 .761.535.535 0 0 1-.762 0L2.89 10.696a.992.992 0 0 0-1.399-.003.983.983 0 0 0 0 1.395l1.855 1.854 2.763 2.765a.538.538 0 0 1-.76.761l-2.765-2.764a.982.982 0 0 0-1.395 0 .989.989 0 0 0 0 1.395l5.32 5.32c3.371 3.372 6.64 4.977 10.49 1.126C19.74 19.8 20.271 17 18.62 13.982L15.812 9.04z"></path>
                                    </g>
                                </svg>
                                { comment['赞'] }
                            </Flex>
                        </Flex>
                        <Flex.Item className="xk-ocomment__item" style={{ marginLeft: 0, marginTop: 4 }}>
                            { comment['课程评价'] }
                        </Flex.Item>
                    </Flex>
                </Flex.Item>
            </Flex>
        )
    }
}

export default OtherComment;