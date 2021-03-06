import React from 'react'
import IonIcon from '@reacticons/ionicons'
import PropTypes from 'prop-types'

class CategorySelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedCategoryId: props.selectedCategory && props.selectedCategory
        }
    }
    selectCategory = (id) => {
        this.setState({
            selectedCategoryId: id
        })
        this.props.selectCategory(id)
    }
    render() {
        const { categories, selectedCategory } = this.props //selectedCategory传过来的cid
        const { selectedCategoryId } = this.state
        return (
            <div className="category-select-component">
                <div className="row">
                    {
                        categories.map((category, index) => {
                            const activeClassName = selectedCategory == category.id ? 'category-item col-3 active mb-4' : 'category-item col-3 mb-4'
                            const activeColor = selectedCategory == category.id ? '#0d6efd' : ''
                            return (
                                <div className={activeClassName} key={index} onClick={() => {this.selectCategory(category.id)}}>
                                    {/* <div className="active">{category.id}</div> */}
                                    
                                    <IonIcon name={category.iconName} color='blue' size="large" style={{ padding: '2px', color: activeColor }}>

                                    </IonIcon>
                                    <div style={{color: activeColor}}>{category.category}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default CategorySelect 