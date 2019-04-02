/* @TIPS searchbar + results(classes) */
/* @TiPS 热门搜索写死算了 */
/* @TIPS 历史搜索放在本地存储中 */
import React from 'react';

import { view as SearchTitle } from '../components/SearchTitle';
import { ClassItem } from '../components/Class';
import { SearchBar, Flex, Badge, Result,
    WingBlank, ActivityIndicator, ListView } from 'antd-mobile';

const hotes = [
    "管理会计研讨",
    "编译原理",
    "计算机组成原理",
    "企业战略管理",
];

const histories = () => {
    let result = [];
    // 确保别的 localStorage 不会乱入
    for (var key in localStorage) {
        if (localStorage.hasOwnProperty(key) &&
            key.substring(0, 7) === 'history') {
            result.push({ key, value: localStorage.getItem(key) });
        }
    }
    result.sort((lhs, rhs) => {
        return parseInt(rhs.key.substr(7, 1), 10) - parseInt(lhs.key.substr(7, 1), 10);
    });
    return result.map(item => (item.value));
};

const searchHistory = (value) => {
    const limit = 8;
    const prefix = 'history';
    if (value.trim() !== "" && !isRepeat(value)) {
        if (localStorage.length < limit) {
            localStorage.setItem(prefix + localStorage.length, value);
        } else {
            for (let i = 0; i < limit; ++i) {
                if (i === limit - 1) {
                    localStorage.setItem(prefix + i, value);
                    return;
                }
                let next_value = localStorage.getItem(prefix + (i + 1));
                localStorage.setItem(prefix + i, next_value);
            }
        }

    }
};

const isRepeat = (value) => {
    for (var key in localStorage) {
        if (localStorage.hasOwnProperty(key) &&
            value === localStorage.getItem(key)) {
            return true;
        }
    }
    return false;
};

class Search extends React.Component {
    constructor(...args){
        super(...args);
        const searchData = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });

        this.state = {
            value: "",
            isLoading: false,
            searchData
        };

        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onBadgeClick = this.onBadgeClick.bind(this);
    }

    componentWillMount() {
        configWX(shareId, function () {
            wx.ready(function () {
                wx.hideAllNonBaseMenuItem();
                wx.showMenuItems({
                    menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline']
                });
                wx.onMenuShareAppMessage(wxDataMessage);
                wx.onMenuShareTimeline(wxDataMessage);
            });
        });
    }

    onChange(value) {
        this.setState({
            value
        });
    }

    onFocus() {
        if (this.rData && this.rData.length === 0) {
            this.rData = null;
            this.setState({
                searchData: this.state.searchData.cloneWithRows([])
            })
        }
    }

    onSubmit() {
        this.setState({
            isLoading: true
        });
        // 加入 localStorage 做历史记录
        searchHistory(this.state.value);

        const apiUrl = `/api/classlistsearch`;

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search: this.state.value, start: 0 })
        }).then((response) => {
            if (response.status !== 200) {
                throw new Error('Fail to get search');
            }

            response.json().then((responseJson) => {
                for (let i = 0; i < responseJson.cnt; i++) {
                    responseJson.lists[i].dmtype = responseJson.dmtype[i];
                    responseJson.lists[i].khtype = responseJson.khtype[i];
                }
                this.rData = responseJson.lists;
                this.setState({
                    searchData: this.state.searchData.cloneWithRows(this.rData),
                    isLoading: false
                })
            }).catch((error) => {
                console.log(error);
            })
        }).catch((error) => {
            console.log(error);
        });

        console.log(this.state.value);
    }

    onClear(value) {
        this.setState({
            value: ""
        });
    }

    onBadgeClick(item) {
        this.setState(
            { value: item },
            () => this.onSubmit()
        );
    }

    render () {
        const hotSearch = (
            <SearchTitle
                style={{ marginTop: 30, marginBottom: 16 }}
                name="热门搜索"
            />
        );

        const history = (
            <SearchTitle
                style={{ marginTop: 60, marginBottom: 16 }}
                name="历史搜索"
            />
        );

        const result = (
            <SearchTitle
                style={{ marginTop: 12, marginBottom: 16 }}
                name="搜索结果"
            />
        );

        const badgeItems = (data) => {
          return data.map(item => {
            return (
                <Badge
                    key={item}
                    text={item}
                    onClick={() => { this.onBadgeClick(item)} }
                    style={{ marginLeft: 12, marginBottom: 6, padding: '0 3px', backgroundColor: '#f19736', borderRadius: 2 }}
                />
            )
          })
        };

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
                <ClassItem classData={rowData} key={rowID} />
            )
        };

        const loading = (
            <ActivityIndicator
                size="large"
                text="搜索中"
                toast />
        );

        const myImg = src => (
            <img src={src}
                 style={{ width: 60, height: 60 }}
                 className="am-icon am-icon-md"
                 alt="" />
        );

        return (
            <div className="xk-search">
                <SearchBar
                    value={this.state.value}
                    cancelText="搜索"
                    showCancelButton
                    onFocus={this.onFocus}
                    onCancel={this.onSubmit}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    placeholder="搜索课程名或教师名" />
                { !this.rData ?
                    (
                        <WingBlank className="xk-search__infos">
                            { hotSearch }
                            <Flex justify="center">
                                { badgeItems(hotes) }
                            </Flex>
                            { history }
                            <Flex justify="center" wrap="wrap">
                                { badgeItems(histories()) }
                            </Flex>
                        </WingBlank>
                    ) : null
                }
                { this.rData && this.rData.length > 0 ?
                    (
                        <div>
                            { result }
                            <ListView
                                dataSource={this.state.searchData}
                                renderRow={row}
                                renderSeparator={separator}
                                className="xk-classes"
                                pageSize={7}
                                useBodyScroll
                            />
                        </div>

                    ) : null
                }
                { this.rData && this.rData.length === 0 ?
                    (
                        <div>
                            { result }
                            <Result
                                img={myImg('https://gw.alipayobjects.com/zos/rmsportal/GIyMDJnuqmcqPLpHCSkj.svg')}
                                title="未搜到相关课程"
                                message="请换用其他关键字重新搜索"
                            />
                        </div>
                    ) : null
                }
                { this.state.isLoading ? loading : null }
            </div>
        )
    }
}

export default Search;