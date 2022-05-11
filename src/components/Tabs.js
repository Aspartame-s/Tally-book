// import { render } from '@testing-library/react'
import React from 'react'

export class Tabs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: props.activeIndex
        }
    }
    handleChange = (index) => {
        this.setState({
            active: index
        })
        this.props.handleTabChange(index)
    }
    render() {
        const { children, activeIndex } = this.props
        const { active } = this.state
        return (
            <ul className="nav nav-tabs nav-fill my-4">
                {React.Children.map(children, (child, index) => {
                    const activeClassName = activeIndex === index ? 'nav-link active' : 'nav-link'
                    return (
                        <li className="nav-item">
                            <div className={activeClassName} onClick={() => {this.handleChange(index)}}>
                                {child}
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}



export const Tab = ({ children }) =>
    <React.Fragment>{children}</React.Fragment>