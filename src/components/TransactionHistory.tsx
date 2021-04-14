import React from 'react'
import { api } from '../api/api'

interface State {
  transactions: any
}

interface Props {
  transactions: any
}

export default class TransactionHistory extends React.Component<Props, State> {
  state: State = {
    transactions: []
  }

  async componentDidMount() {
    await api.getTransactrions().then((data: any) => {
      // this.state.transactions = data;
      let reverse = data.data;
      reverse.reverse();
      this.setState({ transactions: reverse })
    })
  }

  render() {
    return (
      <div style={{ padding: 20 }}>

        <h3>Recently submitted transactions</h3>



        {/* THIS IS FOR PAST TRANSACTIONS */}
        {this.state.transactions &&
          this.state.transactions.slice(0, 10).map((item: any, i: number) => {
            return <div key={i} style={{
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 10,
              borderColor: 'grey',
              width: '50%',
              marginBottom: 20
            }}>
              <p><b>Withdrew ${item.amount}</b> from <b>{item.accountID}</b></p>
            </div>
          })
        }
      </div>
    );
  }
}
