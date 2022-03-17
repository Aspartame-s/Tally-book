import logo from '../logo.svg';
import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { autoFill, range, judgeActive, parseYearAndMonth } from '../utility.js';
import PriceList from '../components/PriceList';
import ViewTabs from '../components/ViewTabs';
import MonthPicker from '../components/MonthPicker';
import PropTypes from 'prop-types'
import TotalPrice from '../components/TotalPrice';
import CreateButton from '../components/CreateButton';

const items = [
    {
        id: 1,
        title: '旅游消费',
        price: 200,
        date: '2022-03-12',
        cid: 1
    },
    {
        id: 2,
        title: '旅游消费2',
        price: 400,
        date: '2022-04-12',
        cid: 1
    },
    {
        id: 3,
        title: '工资',
        price: 100000,
        date: '2022-05-08',
        cid: 2
    },
    {
        id: 4,
        title: '聚餐',
        price: 200,
        date: '2022-06-08',
        cid: 3
    }
]
const categorys = {
    '1': {
        id: 1,
        name: '旅游',
        type: 'outcome',
        iconName: 'airplane-outline'
    },
    '2': {
        id: 2,
        name: '工资',
        type: 'income',
        iconName: 'magnet-outline'
    },
    '3': {
        id: 3,
        name: '汉堡',
        type: 'outcome',
        iconName: 'fast-food-outline'
    }
}
const newItem = {
    id: 4,
    title: '餐饮',
    price: 88,
    date: '2022-01-01',
    cid: 3
}
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items,
            currentDate: parseYearAndMonth(),
            tabView: 'list'
        }
    }
    onChangeDate = (y, m) => {
        console.log(y, m)
        this.setState({
            currentDate: {
                year: y,
                month: m
            }
        })
    }
    createItem = () => {
        items.unshift(newItem)
        this.setState({
            items
        })
    }
    handleDeletes = (item) => {
        const id = item.id
        const newItems = this.state.items.filter((ii) => {
            return ii.id !== id
        })
        this.setState({
            items: newItems
        })
    }
    handleModify = (item) => {
      const modifyItems = this.state.items.map(modifyItem => {
          if(modifyItem.id == item.id) {
              return {...modifyItem, title: '修改标题'}
          }else {
              return modifyItem
          }
      })
      this.setState({
          items: modifyItems
      })
    }
    render() {
        const { items, currentDate, tabView } = this.state
        // console.log(currentDate)
        const itemsWithCategary = items.map(item => {
            item.category = categorys[item.cid]
            return item
        }).filter(item2 => {
            return item2.date.includes(`${currentDate.year}-${autoFill(currentDate.month)}`)
        })
        let totalIncome = 0, toatlOutcome = 0
        itemsWithCategary.forEach((item) => {
            if (item.category.type === 'income') {
                totalIncome += item.price
            } else {
                toatlOutcome += item.price
            }
        })
        return (
            <React.Fragment>
                <header className="App-header">
                    <div className="row">
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    <div className="row">
                        <div className="col">
                            <MonthPicker year={currentDate.year} month={currentDate.month} onChangeDate={(y, m) => this.onChangeDate(y, m)} />
                        </div>
                        <div className="col">
                            <TotalPrice inCome={totalIncome} outCome={toatlOutcome} />
                        </div>
                    </div>
                </header>
                <div className="content-area py-3 px-3">
                    <ViewTabs activeTab={tabView} onTabChange={(tabType) => {
                        this.setState({
                            tabView: tabType
                        })
                    }} />
                    <CreateButton createItem={this.createItem} />
                    {
                        tabView === 'list' ? <PriceList items={itemsWithCategary} handleDelete={this.handleDeletes} handleModify={this.handleModify} /> : <h1>这里是图表模式</h1>
                    }
                    
                </div>
            </React.Fragment>

        )
    }
}

export default Home