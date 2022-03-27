import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Create from './containers/Create';
import { flattenArr } from './utility'
import { testCategory, testItems } from './testData'

// console.log(flattenArr(testCategory))
export const AppContext = React.createContext()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: flattenArr(testItems),
      categories: flattenArr(testCategory)
    }
  }
  render() {
    return (
      <AppContext.Provider value={{
        state: this.state
      }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/create" element={<Create />}>
                <Route path=":id" element={<Create />}></Route>
              </Route>
            </Routes>
            {/* <Home /> */}
          </div>
        </BrowserRouter>
      </AppContext.Provider>
    );
  }
}

export default App;
