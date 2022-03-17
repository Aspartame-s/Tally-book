import React from 'react'
import IonIcon from '@reacticons/ionicons'
import PropTypes from 'prop-types'
const PriceList = ({ items, handleModify, handleDelete }) => {
    return (
        <ul>
            {
                items.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center" >
                        <div className="col-1">
                            <IonIcon name={item.category.iconName} color='blue' size="large" style={{ padding: '2px' }}>

                            </IonIcon>
                        </div>
                        <div className="col-5">{item.title}</div>
                        <div className="col-2">{(item.category.type === 'outcome') ? '-' : '+'}{item.price}</div>
                        <div className="col-2">{item.date}</div>
                        <span className="col-1" onClick={() => { handleModify(item) }}>
                            <IonIcon name='create-outline' color={'#fff'} size="large" style={{ padding: '2px' }}>

                            </IonIcon>
                        </span>
                        <span className="col-1" onClick={() => { handleDelete(item) }}>
                            <IonIcon name='trash-outline' color={'#fff'} size="large" style={{ padding: '2px' }}>

                            </IonIcon>
                        </span>
                    </li>
                ))
            }
        </ul>
    )
}
PriceList.propTypes = {
    items: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleModify: PropTypes.func.isRequired
}
PriceList.defaultProps = {
    handleModify: () => {}
}
export default PriceList