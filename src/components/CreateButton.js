import React from 'react'
import IonIcon from '@reacticons/ionicons'
import PropTypes from 'prop-types'

const CreateButton = ({createItem}) => {
    return (
        <div className="btn btn-primary d-flex justify-content-center align-items-center" onClick={() => {createItem()}}>
            <IonIcon name="add-circle-outline" color='blue' size="large" ></IonIcon>
            创建一条新的记录
        </div>
    )
}

export default CreateButton