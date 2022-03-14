import React from 'react'
import PropTypes from 'prop-types'
import {autoFill} from '../utility'
class MonthPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: true
        }
    }
    toggleOpen = (e) => {
        e.preventDefault()
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        const {year, month} = this.props
        const { isOpen } = this.state
        return (
            <div className="dropdown month-picker-component">
                <h4>选择月份</h4>
                <button className="btn btn-lg btn-secondary dropdown-toggle" onClick={this.toggleOpen}>
                    {`${year}年 ${autoFill(month)}月`}
                </button>
                {
                    isOpen ? <div className="dropdown-menu" style={{display: 'block', position: 'relative'}}>
                        <h2 style={{textAlign: 'center'}}>hello world</h2>
                    </div> : ''
                }
            </div>
        )
    }
}
export default MonthPicker