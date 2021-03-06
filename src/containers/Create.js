import React from 'react'
import { useParams } from "react-router-dom";
import CategorySelect from '../components/CategorySelect';
import PriceForm from '../components/PriceForm';
import { testCategory } from '../testData';
import { Tabs, Tab } from '../components/Tabs';
import withContext from '../withContext';
import { withRouter } from 'react-router-dom';
const tabsText = [ 'outcome', 'income']

class Create extends React.Component {
    constructor(props) {    
        super(props)
        const {id} = this.props.match.params
        const {items, categories} = props.data
        this.state = {
            selectedCategory: id && items[id] ? items[id].category.id : null, //选择记账种类的id 也就是cid
            // tabView: id && items[id] ? items[id].category.type : 'income'
        }
    }
    selectCategory = (id) => {
        this.setState({
            selectedCategory: id
        })
    }
    componentDidMount() {
        console.log(this.props.location)
        if(this.props.location.state !== undefined) {
            const isEdit = this.props.location.state.isEdit
            this.setState({
                isEdit
            })
        }
        const {id} = this.props.match.params
        if(id) {
            this.props.actions.getEditData(id).then(res => {
                const {items, categories} = res
                this.setState({
                    selectedCategory: id ? items.cid : null,
                    tabView: id ? categories[items.cid].type : 'outcome'
                })
            })
        }else {
            this.setState({
                tabView: 'outcome'
            })
        }
    }
    submit = (data, isEdit) => {
        if(isEdit) {
           //update
           this.props.actions.updateItem(data, this.state.selectedCategory)
           this.props.history.push('/')
        }else {
            //create
            if(this.state.selectedCategory) {
                this.props.actions.createItem(data, this.state.selectedCategory)
                this.props.history.push('/')
            }else {
                alert('请选择种类')
            }
        }
    }
    cancel = (id) => {
        this.props.history.push('/')
    }
    handleTabChange = (index) => {
        console.log(123)
        this.setState({
            tabView: tabsText[index]
        })
    }
    render() {
        const { tabView, isEdit } = this.state
        const {categories} = this.props.data
        // const filterCategory = Object.keys(categories).map(id => categories[id]).filter((category, index) => { return category.type === tabView })
        const filterCategory = testCategory.filter((category, index) => { return category.type === tabView })
        const {id} = this.props.match.params
        const editItem = id && this.props.data.items[id] ? this.props.data.items[id] : {}
        console.log(editItem)
        // const cid = editItem ? editItem.cid : null
        const tabIndex = tabsText.findIndex(text => text === this.state.tabView)
        return (
            <React.Fragment>
                {/* <h1>这是create组件</h1> */}
                <Tabs activeIndex={tabIndex} handleTabChange={this.handleTabChange}>
                    <Tab>支出</Tab>
                    <Tab>收入</Tab>
                </Tabs>
                <CategorySelect categories={filterCategory} selectedCategory={this.state.selectedCategory} selectCategory={this.selectCategory} />
                <PriceForm onSubmit={this.submit} onCancel={this.cancel} editItem={editItem} isEdit={isEdit} />
            </React.Fragment>
        )
    }
}


export default withRouter(withContext(Create))