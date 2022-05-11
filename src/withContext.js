import React from 'react'
import { AppContext } from './App'


//高阶组件
const withContext = (Component) => {
    return (props) => (
        <AppContext.Consumer>
            {({state, actions}) => {
                return <Component {...props} data={state} actions={actions}></Component>
            }}
        </AppContext.Consumer>
    )
}

export default withContext