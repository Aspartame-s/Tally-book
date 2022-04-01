import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Create from './containers/Create';
import axios from 'axios';
import { flattenArr, ID, parseYearAndMonth } from './utility'
import { testCategory, testItems } from './testData'

// console.log(flattenArr(testCategory))
export const AppContext = React.createContext()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: {},
      categories: {},
      currentDate: parseYearAndMonth()
    }
    
    this.actions = {
      getInitData: async () => {
         // console.log(this.state.currentDate.year)
         const filtertItems = `/items?monthCategory=${parseYearAndMonth().year}-${parseYearAndMonth().month}&_sort=timestamp&_order=desc`
         const results = await Promise.all([axios.get('/categories'), axios.get(filtertItems)])
         console.log(results)
        //  Promise.all(promiseArr).then(res => {
           const [ categories, items ] = results
           console.log(items)
           console.log(categories)
          //  console.log(res)
           this.setState({
             items: flattenArr(items.data),
             categories: flattenArr(categories.data)
           })
        //  })
      },
      selectYearAndMonth: async (year, month) => {
        const results = await axios.get(`/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`) 
        // axios.get(filtertItems).then(res => {
          this.setState({
            items: flattenArr(results.data),
            currentDate: {year, month}
          })
        // })
      },
      deleteItem: (item) => {
        axios.delete(`/items/${item.id}`).then(res => {
          delete this.state.items[item.id]
          this.setState({
            items: this.state.items
          })
        })
      },
      createItem: (data, cid) => {
        const newId = ID()
        const parseDate = parseYearAndMonth(data.date)
        data.monthCategory = `${parseDate.year}-${parseDate.month}`
        data.id = newId
        var timestamp = new Date(data.date).getTime()
        const newItem = {...data, timestamp: timestamp, cid: cid}
        console.log(newItem)
        this.setState({
          items: {...this.state.items, [newId]: newItem}
        })
        // console.log(parseDate)
        // console.log('data:', data)
        // console.log('cid:', cid)
      },
      updateItem: (data, cid) => {
        const editId = data.id
        const editItem = {...data, cid, timestamp: new Date(data.date).getTime()}
        this.setState({
          items: {...this.state.items, [editId]: editItem}
        })
        // console.log(data)
        // console.log(cid)
      }
    } 
  }
  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        actions: this.actions
      }}>
        <Router>
          <div className="App">
            {/* <div className="container pb-5"> */}
            <Route path="/" exact component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/edit/:id" component={Create} />
            {/* </div> */}
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
