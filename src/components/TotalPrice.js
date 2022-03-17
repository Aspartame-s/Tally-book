import React from 'react'
import IonIcon from '@reacticons/ionicons'
import PropTypes from 'prop-types'

const TotalPrice = ({ inCome, outCome }) => {
    return (
        <React.Fragment>
            <div className="row" style={{ marginRight: '0' }}>
                <div className="col">
                    <div>收入</div><span>{inCome}</span>
                </div>
                <div className="col">
                    <div>支出</div><span>{outCome}</span>
                </div>
            </div>
        </React.Fragment>

    )
}

export default TotalPrice