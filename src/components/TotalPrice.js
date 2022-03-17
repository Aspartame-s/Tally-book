import React from 'react'
import IonIcon from '@reacticons/ionicons'
import PropTypes from 'prop-types'

const TotalPrice = ({ inCome, outCome }) => {
    return (
        <React.Fragment>
            <div className="row" style={{ marginRight: '0' }}>
                <div className="col">收入:{inCome}</div>
                <div className="col">支出:{outCome}</div>
            </div>
        </React.Fragment>

    )
}

export default TotalPrice