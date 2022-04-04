import logo from '../logo.svg';
import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { autoFill, range, judgeActive, parseYearAndMonth, getPieChartData } from '../utility.js';
import PriceList from '../components/PriceList';
import ViewTabs from '../components/ViewTabs';
import MonthPicker from '../components/MonthPicker';
import PropTypes from 'prop-types'
import TotalPrice from '../components/TotalPrice';
import CreateButton from '../components/CreateButton';
import IonIcon from '@reacticons/ionicons'
import { Tabs, Tab } from '../components/Tabs';
import withContext from '../withContext'
import {withRouter} from 'react-router-dom'
import PieCharts from '../components/Piechart';


const tabsText = ['list', 'chart']

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // currentDate: parseYearAndMonth(),
            tabView: 'list'
        }
    }

    componentDidMount() {
    //    console.log(this.props)
    console.log(123)
       this.props.actions.getInitData().then(res => {
           console.log(res)
       })
    }

    onChangeDate = (y, m) => {
        console.log(y, m)
        this.props.actions.selectYearAndMonth(y, m)
        // this.setState({
        //     currentDate: {
        //         year: y,
        //         month: m
        //     }
        // })
    }
    // 创建新的条目
    createItem = () => {
        // items.unshift(newItem)
        // this.setState({
        //     items
        // })
        this.props.history.push({pathname:'/create', state: {isEdit: 0}})
    }
    handleDeletes = (item) => {
        // const id = item.id
        // const newItems = this.state.items.filter((ii) => {
        //     return ii.id !== id
        // })
        // this.setState({
        //     items: newItems
        // })
        this.props.actions.deleteItem(item)
        
    }
    // 修改条目
    handleModify = (item) => {
        // this.props.history.push(`/edit/${item.id}`)
        this.props.history.push({pathname: `/edit/${item.id}`, state: {res: item, isEdit: 1}})
        // const modifyItems = this.state.items.map(modifyItem => {
        //     if (modifyItem.id == item.id) {
        //         return { ...modifyItem, title: '修改标题' }
        //     } else {
        //         return modifyItem
        //     }
        // })
        // this.setState({
        //     items: modifyItems
        // })
    }

    // 新Tab栏处理事件
    handleTabChange = (index) => {
        console.log(index)
        this.setState({
            tabView: tabsText[index]
        })
    }
    render() {
        const { data } = this.props
        const {items, categories, currentDate} = data
        console.log(items)
        const { tabView } = this.state
        const itemsWithCategary = Object.keys(items).map(id => {
            items[id].category = categories[items[id].cid]
            return items[id]
        })
        const pieChartDataWithOutcome = getPieChartData(itemsWithCategary, 'outcome')
        const pieChartDataWithIncome = getPieChartData(itemsWithCategary, 'income')
        console.log(itemsWithCategary)
        let totalIncome = 0, toatlOutcome = 0
        itemsWithCategary.forEach(item => {
            if (item.category.type === 'income') {
                totalIncome += Number(item.price)
            } else {
                toatlOutcome += Number(item.price)
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
                    <Tabs activeIndex={0} handleTabChange={this.handleTabChange}>
                        <Tab>
                            <IonIcon name="list-circle-outline" style={{ fontSize: '20px' }}></IonIcon>
                            列表模式
                        </Tab>
                        <Tab>
                            <IonIcon name="pie-chart-outline" style={{ fontSize: '20px', marginRight: '2px', padding: '2px' }}></IonIcon>
                            图表模式
                        </Tab>
                    </Tabs>
                    {/* <ViewTabs activeTab={tabView} onTabChange={(tabType) => {
                        this.setState({
                            tabView: tabType
                        })
                    }} /> */}
                    <CreateButton createItem={this.createItem} />
                    {
                        tabView === 'list' ? <PriceList items={itemsWithCategary} handleDelete={this.handleDeletes} handleModify={this.handleModify} /> : 
                        (<React.Fragment>
                            <PieCharts pieChartData={pieChartDataWithOutcome}></PieCharts>
                            <PieCharts pieChartData={pieChartDataWithIncome}></PieCharts>
                        </React.Fragment>)
                    }

                </div>
            </React.Fragment>

        )
    }
}

export default withRouter(withContext(Home))