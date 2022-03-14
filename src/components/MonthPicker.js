import React from 'react'
import PropTypes from 'prop-types'
import {autoFill} from '../utility'
class MonthPicker extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {year, month} = this.props
        return (
            <div className="dropdown month-picker-component">
                <h4>选择月份</h4>
                <button className="btn btn-lg btn-secondary dropdown-toggle">
                    {`${year}年 ${autoFill(month)}月`}
                </button>
            </div>
        )
    }
}
export default MonthPicker