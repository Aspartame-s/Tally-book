import React from 'react'
import { useParams } from "react-router-dom";
import CategorySelect from '../components/CategorySelect';
import PriceForm from '../components/PriceForm';
import { testCategory } from '../testData';
import { Tabs, Tab } from '../components/Tabs';
import { AppContext } from '../App';

const tabsText = ['income', 'outcome']
const categories = [
    {
        id: 1,
        category: '旅行',
        iconName: 'airplane-outline'
    },
    {
        id: 2,
        category: '喝酒',
        iconName: 'beer-outline'
    },
    {
        id: 3,
        category: '房租',
        iconName: 'home-outline'
    },
    {
        id: 4,
        category: '饮食',
        iconName: 'restaurant-outline'
    },
]

// const selectedCategory = {
//     id: 1,
//     name: '选中'
// }

class Create extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories,
            selectedCategory: {
                id: 0,
                name: '选中'
            },
            tabView: 'income'
        }
    }
    selectCategory = (id) => {
        this.setState({
            selectedCategory: {
                id,
                name: '选中'
            }
        })
        console.log(id)
    }
    submit = (params) => {
        console.log('params:', params)
    }
    cancel = (id) => {
        console.log(id)
    }
    handleTabChange = (index) => {
        console.log(index)
        this.setState({
            tabView: tabsText[index]
        })
    }
    render() {
        const { tabView } = this.state
        const filterCategory = testCategory.filter((category, index) => { return category.type === tabView })
        return (
            <AppContext.Consumer>
                {
                    ({ state }) => {
                        console.log(state)
                        return (
                            <React.Fragment>
                                {/* <h1>这是create组件</h1> */}
                                <Tabs activeIndex={0} handleTabChange={this.handleTabChange}>
                                    <Tab>收入</Tab>
                                    <Tab>支出</Tab>
                                </Tabs>
                                <CategorySelect categories={filterCategory} selectedCategory={this.state.selectedCategory} selectCategory={this.selectCategory} />
                                <PriceForm onSubmit={this.submit} onCancel={this.cancel} />
                            </React.Fragment>
                        )
                    }
                }

            </AppContext.Consumer>
        )
    }
}


export default Create