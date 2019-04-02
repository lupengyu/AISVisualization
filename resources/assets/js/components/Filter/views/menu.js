import React from 'react';
import { connect } from 'react-redux';

import { setKind, setSeason, setTest, setTime, setSite, setCheck } from '../actions';
import { Menu } from 'antd-mobile';

const filterMenu = ({data, value, onChange}) => {
    return (
        <Menu height={null} value={[value]} data={data} onChange={onChange} level={1} />
    )
};

const mapStateToProps = (state, ownProps) => {
    let value = "";
    switch (ownProps.type) {
        case 'kind': {
            value = state.filter.kind;
            break;
        }
        case 'season': {
            value = state.filter.season;
            break;
        }
        case 'test': {
            value = state.filter.test;
            break;
        }
        case 'time': {
            value = state.filter.time;
            break;
        }
        case 'site': {
            value = state.filter.site;
            break;
        }
        case 'check': {
            value = state.filter.check;
            break;
        }
        default: {
            value = ""
        }
    }
    return {
        value
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: (item) => {
        item = Object.values(item[0]).join('');
        switch (ownProps.type) {
            case 'kind': {
                dispatch(setKind({
                    kind: item
                }));
                break;
            }
            case 'season': {
                dispatch(setSeason({
                    season: item
                }));
                break;
            }
            case 'test': {
                dispatch(setTest({
                    test: item
                }));
                break;
            }
            case 'time': {
                dispatch(setTime({
                    time: item
                }));
                break;
            }
            case 'site': {
                dispatch(setSite({
                    site: item
                }));
                break;
            }
            case 'check': {
                dispatch(setCheck({
                    check: item
                }));
                break;
            }
            default: {
                console.log('xixi');
            }
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(filterMenu);