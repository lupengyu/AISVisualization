import React from 'react';
import PropTypes from 'prop-types';

import Select from 'antd/lib/select';
import 'antd/lib/select/style/css';

const Option = Select.Option;

const MySelect = ({value, data, onChange}) => {
    const options = data.map(item => <Option key={item}>{item}</Option>);
    return (
        <Select value={value} onChange={onChange}>
            { options }
        </Select>
    );
};

MySelect.propTypes = {
    value: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

export default MySelect;