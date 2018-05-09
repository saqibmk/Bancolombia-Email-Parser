import React, { Component } from 'react';
import parseCurrency from '../helpers';

class Summary extends Component {
  render() {
    return (
      <div>
        <p> Total Spent {parseCurrency('$1.000.000,00')}</p>
        <p> Debit $1.000.000,00</p>
        <p> Credit $1.000.000,00</p>
        <p> Payments $1.000.000,00</p>
      </div>
    );
  }
}

export default Summary;
