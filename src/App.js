import logo from './logo.svg';
import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import PriceList from './components/ComponentName';
import ViewTabs from './components/ViewTabs';
import MonthPicker from './components/MonthPicker';
const items = [
  {
    id: 1,
    title: '旅游消费',
    price: 200,
    date: '2022-3-12',
    category: {
      id: 1,
      name: '旅游',
      type: 'outcome',
      iconName: 'airplane-outline'
    }
  },
  {
    id: 2,
    title: '旅游消费2',
    price: 400,
    date: '2022-3-12',
    category: {
      id: 1,
      name: '旅游',
      type: 'outcome',
      iconName: 'airplane-outline'
    }
  }
]
// var tab = 'list'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: 'list'
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <ViewTabs activeTab={this.state.tab} onTabChange={(tabType) => {
          this.setState({
            tab: tabType
          })
        }} />
        <MonthPicker year={2022} month={3} />
        <PriceList items={items} handleModify={(item) => alert(item.id)} handleDelete={(item) => {alert(item.price)}} />
      </div>
    );
  }
}

export default App;
