import React from 'react'
import PropTypes from 'prop-types'
import { commonYear, autoFill, range, judgeActive } from '../utility'
class MonthPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            activeYear: this.props.year,
            activeMonth: this.props.month
        }
    }
    toggleOpen = (e) => {
        e.preventDefault()
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    toggleYear = (i) => {
        this.setState({
            activeYear: i
        })
    }
    toggleMonth = (i) => {
        this.setState({
            activeMonth: i,
            isOpen: false
        })
        this.props.onChangeDate(this.state.activeYear, i)
    }
    render() {
        const { year, month } = this.props
        const { isOpen } = this.state
        const monthArr = range(12, 1)
        const yearArr = range(9, -4).map((item) => item + commonYear)
        return (
            <div className="dropdown month-picker-component">
                <h4>选择月份</h4>
                <button className="btn btn-lg btn-secondary dropdown-toggle" onClick={this.toggleOpen}>
                    {`${year}年 ${autoFill(month)}月`}
                </button>
                {
                    isOpen ?
                        <div className="dropdown-menu" style={{ display: 'block', position: 'relative' }}>
                            <div className="row" style={{marginRight: '0'}}>
                                <div className="col-6">
                                   {
                                       yearArr.map((item, index) => {
                                           return(
                                            <div key={index} className={judgeActive(item, this.state.activeYear)} onClick={() => this.toggleYear(item)}>{item}</div>
                                           )
                                       }
                                        
                                    )}
                                </div>
                                <div className="col-6">
                                {
                                       monthArr.map((item, index) =>
                                        <div key={index} className={judgeActive(item, this.state.activeMonth)} onClick={() => this.toggleMonth(item)}>{autoFill(item)}</div>
                                       )
                                   }
                                </div>
                            </div>
                        </div>
                        : ''
                }
            </div>
        )
    }
}
MonthPicker.propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    onChangeDate: PropTypes.func.isRequired
}
export default MonthPicker