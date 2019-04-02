import React from 'react';
import { connect } from 'react-redux';

import ClassItem from './class';
import { setClasses, setStart, getClasses } from '../actions';
import { ListView, ActivityIndicator } from 'antd-mobile';

class Classes extends React.Component {
    constructor(props) {
        super(props);
        this.onEndReached = this.onEndReached.bind(this);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });

        this.state = {
            dataSource,
            isLoading: true,
            isNull: false
        };

        this.refreshData = this.refreshData.bind(this);
    }

    componentWillMount() {
        // 首次加载以请求第一波数据
        if (this.props.startIndex === -10) {
            this.refreshData();
        } else {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.props.data),
                isLoading: false
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        // 会执行两次，第一次是因为 setPage，第二次是因为 setClasses   
        // 所以为了避免两次 refresh ，要先检查已有是否已经为 0，如果是说明正在请求 
        if (this.props.startIndex !== -10 && nextProps.startIndex === -10) {
            // 更改筛选条件后在重新加载
            this.refreshData();
        } else if (this.props.data !== nextProps.data) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.data),
                isLoading: nextProps.data.length === 0
            });
        }

        if (this.props.itemIndex !== nextProps.itemIndex) {
            this.refs.lv.scrollTo(0, nextProps.itemIndex);
        }
    }

    componentDidMount() {
        this.refs.lv.scrollTo(0, this.props.itemIndex);
    }

    refreshData() {
        this.setState(
            {
                dataSource: this.state.dataSource.cloneWithRows([]),
                isLoading: true,
                isNull: false
            }, 
            () => {
                this.props.getClasses({
                    classtype: this.props.type,
                    education: this.props.education,
                    college: this.props.college,
                    time: this.props.time,
                    place: this.props.place,
                    dmtype: this.props.dmtype,
                    khtype: this.props.khtype,
                    term: this.props.term,
                    start: 0
                });
                
                setTimeout(() => {
                    if (this.state.isLoading) {
                        this.setState({ isNull: true });
                    }
                }, 6000);
        })
    }

    onEndReached(event) {
        if (this.state.isLoading) {
            return;
        }
        this.setState({ isLoading: true, isNull: false });
        this.props.getClasses({
            classtype: this.props.type,
            education: this.props.education,
            college: this.props.college,
            time: this.props.time,
            place: this.props.place,
            dmtype: this.props.dmtype,
            khtype: this.props.khtype,
            term: this.props.term,
            start: this.props.startIndex
        });
    }

    render () {
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
                <ClassItem classData={rowData} index={rowID} key={rowID} />
            )
        };
        const loading = (
            this.state.isNull ? <div><span>暂无数据，请更换筛选条件重试</span></div> :
            (
                <div>
                    <ActivityIndicator size="large"/>
                    <span>加载中...</span>
                    <br />
                    <br />
                    <span>提示：若加载时间过长，请更换筛选条件重试</span>
                </div>
            )
        );
        
        return (
            <ListView
                ref="lv"
                dataSource={this.state.dataSource}
                renderFooter={() => (
                    <div style={{ padding: 30, textAlign: 'center'}}>
                        { this.state.isLoading ? loading : '点击继续加载' }
                    </div>
                )}
                renderRow={row}
                renderSeparator={separator}
                className="xk-classes"
                pageSize={7}
                initialListSize={ this.props.startIndex }
                useBodyScroll
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={300}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    startIndex: state.class.start,
    data: state.class.data,
    education: state.school.level,
    college: state.school.school,
    type: state.filter.kind,
    time: state.filter.time,
    place: state.filter.site,
    dmtype: state.filter.check,
    khtype: state.filter.test,
    term: state.filter.season,
    itemIndex: state.class.index
});

const mapDispatchToProps = (dispatch) => ({
    setStart: (startIndex) => {
        dispatch(setStart({
            start: startIndex
        }))
    },

    setClasses: (data) => {
        dispatch(setClasses({
            data
        }))
    },

    getClasses: (paras) => {
        dispatch(getClasses(paras));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Classes);