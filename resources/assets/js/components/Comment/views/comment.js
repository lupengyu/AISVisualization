import React from 'react';

import { Flex, Card, Button, Popover, Icon } from 'antd-mobile';
import "./style.css";

const Item = Popover.Item;

class comment extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            visible: false
        };

        this.onSelect = this.onSelect.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
    }

    onSelect(opt) {
        // 若是点击删除按钮，调用父组件删除函数
        if (opt.props.value === 'delete') {
            this.props.onDelete(this.props.data.id);
        } else if (opt.props.value === 'share') {
            this.props.showTip(this.props.data);
        }

        this.setState({
            visible: false
        });
    };

    handleVisibleChange(visible) {
        this.setState({
            visible,
        });
    };

    render() {
        const title = (
            <Flex className="xk-comment__title" align="center">
                <p className="xk-comment__classname">{ this.props.data['class_name'] }</p>
                <p className="xk-comment__teacher">{ this.props.data.type === 1 ? '审核通过' : '审核中' }</p>
            </Flex>
        );
    
        const operation = (
            <Flex justify="end" align="start" style={{ marginTop: 4 }}>
                <Button type="ghost" inline size="small" onClick={() => { this.props.showMore(this.props.data); }}>详细内容</Button>
                <Popover mask
                    overlayClassName="fortest"
                    overlayStyle={{ color: 'currentColor' }}
                    visible={this.state.visible}
                    overlay={[
                    (<Item key="4" value="share" style={{ padding: '0 16px' }}>分享</Item>),
                    (<Item key="5" value="delete" style={{ color: '#f4333c', padding: '0 16px' }}>删除</Item>),
                    ]}
                    align={{
                    overflow: { adjustY: 0, adjustX: 0 },
                    offset: [-10, 0],
                    }}
                    onVisibleChange={this.handleVisibleChange}
                    onSelect={this.onSelect}
                >
                    <Button style={{
                        marginLeft: '15px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    type="ghost" inline size="small"
                    >
                        <Icon type="ellipsis" />
                    </Button>
                </Popover>
            </Flex>
        );

        return (
            <Card full>
                <Card.Header
                    title={ title }
                    extra={ operation }
                />
                <Card.Body>
                    { this.props.data['课程评价'] }
                </Card.Body>
                <Card.Footer
                    content={ this.props.data.time }
                />
            </Card>
        )
    }
}

export default comment;
