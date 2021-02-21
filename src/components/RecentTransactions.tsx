import React from 'react'

interface State {
  transactions: any
}

interface Props {
  transactions?: any //props from submitted transactions
}

export default class TransactionHistory extends React.Component<Props, State> {
  state: State = {
    transactions: []
  }

  componentDidUpdate(prevProps: any) {
    //If props new props received, use those (in state)
    if (this.props.transactions !== prevProps.transactions) {
      this.setState({ transactions: this.props.transactions.slice(0, 10) })
    }
  }

  render() {
    return (
      <div style={{ padding: 20 }}>

        {this.state.transactions.length > 0 &&
          <h3>Recently submitted transactions</h3>}

        {this.state.transactions &&
          this.state.transactions.map((item: any, i: number) => {
            return <div key={i} style={{
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 10,
              borderColor: '#f0f0f0',
              width: '50%',
              margin: 'auto',
              marginBottom: 15
            }} datatype='transaction'>
              <p><b>{item.amount > 0 ? 'Tranffered' : 'Withdrew'} ${item.amount > 0 ? item.amount : item.amount * -1}</b> from <b>{item.accountID}</b></p>
              <p>Current <b>{item.accountID}</b>'s balance is $<b>{item.balance}</b></p>
            </div>
          })
        }

        {/* Show more button if there are more than 10 transactions */}
        {(this.props.transactions.length > 10 && this.state.transactions.length === 10) &&
          <button onClick={() => {
            this.setState({ transactions: this.props.transactions })
          }}>SHOW MORE</button>}

      </div>
    );
  }
}
