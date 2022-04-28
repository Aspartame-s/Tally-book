import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home';
import { HashRouter as Router, Route } from 'react-router-dom'
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
           return {
            items: flattenArr(items.data),
            categories: flattenArr(categories.data)
           }
        //  })
      },
      getEditData: async (id) => {
        const promiseArr = [axios.get('/categories')]
        promiseArr.push(axios.get(`/items/${id}`))
        const results = await Promise.all(promiseArr)
        const [categories, items] = results
        if(id) {
          this.setState({
            items: {...this.state.items, [id]: items.data},
            categories: flattenArr(categories.data)
          })
        }else {
          this.setState({
            categories: flattenArr(categories.data)
          })
        }
        return {
          categories: flattenArr(categories.data),
          items: items ? items.data : null 
        }
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
      createItem: async (data, cid) => {
        const newId = ID()
        const parseDate = parseYearAndMonth(data.date)
        data.monthCategory = `${parseDate.year}-${parseDate.month}`
        data.id = newId
        var timestamp = new Date(data.date).getTime()
        // const newItem = {...data, timestamp: timestamp, cid: cid}
        const newItem = await axios.post('/items', {...data, timestamp: timestamp, cid: cid})
        console.log(newItem)
        this.setState({
          items: {...this.state.items, [newId]: newItem.data}
        })
        // console.log(parseDate)
        // console.log('data:', data)
        // console.log('cid:', cid)
      },
      updateItem: async (data, cid) => {
        console.log(data)
        const editId = data.id
        console.log(new Date(data.date).getFullYear())
        const monthCategory = new Date(data.date).getFullYear() + '-' + (new Date(data.date).getMonth() + 1)
        // const editItem = {...data, cid, timestamp: new Date(data.date).getTime()}
        const editItem = await axios.put(`/items/${editId}`, {...data, cid, timestamp: new Date(data.date).getTime(), monthCategory })
        this.setState({
          items: {...this.state.items, [editId]: editItem.data}
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
