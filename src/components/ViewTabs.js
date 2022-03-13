import React from 'react'
import IonIcon from '@reacticons/ionicons'
import PropTypes from 'prop-types'

const generateLinkClass = (currentTab, views) => {
    return (currentTab === views) ? 'nav-link active' : 'nav-link'
}
const ViewTabs = ({ activeTab, onTabChange }) => {
    return (
        <ul className="nav nav-tabs nav-fill my-4">
            <li className="nav-item">
                <span className={generateLinkClass('list', activeTab)} onClick={() => {onTabChange('list')}}>列表模式</span>
            </li>
            <li className="nav-item">
                <span className={generateLinkClass('chart', activeTab)} onClick={() => {onTabChange('chart')}}>图表模式</span>
            </li>
        </ul>
    )

}

export default ViewTabs