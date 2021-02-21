import React from 'react';
import './App.css';
import Header from './components/Header';
import TransactionInput from './components/TransactionInput'
import RecentTransactions from './components/RecentTransactions'

class App extends React.Component {

  state = {
    transactions: []
  }

  render() {
    return (
      <div style={{ textAlign: 'center', margin: 'auto' }}>
        <Header />
        <TransactionInput OnPass={(value) => {
          this.setState({ transactions: [value, ...this.state.transactions] })
        }} />
        <RecentTransactions transactions={this.state.transactions} />
      </div>
    );
  }
}

export default App;
