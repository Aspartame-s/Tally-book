import logo from './logo.svg';
import React, {Component} from 'react';
import './App.css';
import Home from './containers/Home';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: 'list',
      year: 2022,
      month: 3
    }
  }
  onChangeDate = (y, m) => {
    console.log(y, m)
    this.setState({
      year: y,
      month: m
    })
  }
  render() {
    const {year, month} = this.state
    return (
      <div className="App">
        <Home />
        {/* <header className="App-header">
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
        <MonthPicker year={year} month={month} onChangeDate={(y, m) => this.onChangeDate(y, m)}  />
        <PriceList items={items} handleModify={(item) => alert(item.id)} handleDelete={(item) => {alert(item.price)}} /> */}
      </div>
    );
  }
}

export default App;
