import logo from './logo.svg';
import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const items = [
  {
    id: 1,
    title: '旅游消费',
    price: 200,
    date: '2022-3-12',
  }
]

class App extends Component {
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
      </div>
    );
  }
}

export default App;
