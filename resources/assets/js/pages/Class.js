/* @TIPS header(父页面提供) + filter + classes */

import React from 'react';
import { connect } from 'react-redux';

import {view as Filter} from '../components/Filter';
import {view as Classes} from '../components/Class';

class Class extends React.Component {
    constructor(...args) {
        super(...args);
    }

    render() {
        return(
            <div>
                <Filter />
                <Classes />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }
};

export default connect(mapStateToProps, null)(Class);