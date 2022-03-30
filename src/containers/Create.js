import React from 'react'
import { useParams } from "react-router-dom";
import CategorySelect from '../components/CategorySelect';
import PriceForm from '../components/PriceForm';
import { testCategory } from '../testData';
import { Tabs, Tab } from '../components/Tabs';
import withContext from '../withContext';
import { withRouter } from 'react-router-dom';
const tabsText = ['income', 'outcome']


// const selectedCategory = {
//     id: 1,
//     name: '选中'
// }

class Create extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedCategory: null, //选择记账种类的id 也就是cid
            tabView: 'income'
        }
    }
    selectCategory = (id) => {
        this.setState({
            selectedCategory: id
        })
        console.log(id)
    }
    submit = (data) => {
        
        if(this.state.selectedCategory) {
            this.props.actions.createItem(data, this.state.selectedCategory)
            this.props.history.push('/')
        }else {
            alert('请选择种类')
        }
    }
    cancel = (id) => {
        this.props.history.push('/')
        console.log(id)
    }
    handleTabChange = (index) => {
        console.log(index)
        this.setState({
            tabView: tabsText[index]
        })
    }
    componentWillMount() {
        console.log(this.props)
        if(this.props.location.state !== undefined) {
            const initItems = this.props.location.state.res
            // console.log(this.props.location.state.res)
            this.setState({
                initItems
            })
        }
    }
    render() {
        const { tabView, initItems } = this.state
        const filterCategory = testCategory.filter((category, index) => { return category.type === tabView })
        return (
            <React.Fragment>
                {/* <h1>这是create组件</h1> */}
                <Tabs activeIndex={0} handleTabChange={this.handleTabChange}>
                    <Tab>收入</Tab>
                    <Tab>支出</Tab>
                </Tabs>
                <CategorySelect categories={filterCategory} selectedCategory={this.state.selectedCategory} selectCategory={this.selectCategory} />
                <PriceForm onSubmit={this.submit} onCancel={this.cancel} initItems={initItems} />
            </React.Fragment>
        )
    }
}


export default withRouter(withContext(Create))