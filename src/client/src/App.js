import React, { Component } from 'react';
import Summary from './components/Summary';
import TransactionList from './components/TransactionList';

import './App.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Summary />
        <TransactionList />
      </div>
    );
  }
}

export default App;
