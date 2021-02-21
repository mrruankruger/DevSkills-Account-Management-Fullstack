import React from 'react'
import { api } from '../api/api'
import '../styles/styles.css'
import { styles } from '../styles/styles'

interface State {
  accountID: any,
  amount: any,
  error: any
}

interface Props {
  OnPass: (value: any) => void
}

export default class TransactionInput extends React.Component<Props, State> {
  state: State = {
    accountID: '',
    amount: '',
    error: ''
  }

  render() {
    return (
      <div style={{ width: '18%', margin: 'auto', display: 'block' }}>
        <form data-type="transaction-form" style={styles.form}>
          <div style={{ marginBottom: 10 }}>
            <label style={styles.label}>Account ID:</label>
            <input type="text" id="accountID" data-type='account-id' value={this.state.accountID}
              style={{ width: '50%' }}
              onChange={(value: any) => {
                this.setState({ accountID: value.target.value })
                this.setState({ error: '' })
              }}
              className="Button" />
          </div>

          <div style={{ marginBottom: 15 }}>
            <label style={styles.label}>Amount:</label>
            <input type="text" id="Amount" data-type="amount" value={this.state.amount}
              style={{ width: '50%' }}
              onChange={(value: any) => {
                //validate only numbers
                if (!isNaN(value.target.value) || value.target.value === '-') {
                  this.setState({ amount: value.target.value })
                  this.setState({ error: '' })
                } else {
                  value.target.value = ''
                }
              }} />
          </div>

          <div style={{ float: 'left' }}>
            <button onClick={async (e: any) => {
              e.preventDefault(); //prevents page refreshing after submit

              if (this.state.amount && this.state.accountID) {
                await api.postTransactrions(this.state.accountID, this.state.amount).then(async (res) => {
                  if (res === 'Transaction created.') {
                    await api.getBalance(this.state.accountID).then((bal) => {
                      let currentTrx = {
                        accountID: this.state.accountID,
                        amount: this.state.amount,
                        balance: bal.balance
                      }
                      //pass back results as object to be rendered
                      this.props.OnPass(currentTrx)
                      this.setState({ amount: '' })
                      this.setState({ accountID: '' })
                    })
                  } else {
                    this.setState({ error: res })
                  }
                });
              }
            }
            }>Submit</button>

            {/* Shows errors if any */}
            {this.state.error &&
              <p style={{ color: 'red', textTransform: 'capitalize' }}>{this.state.error}</p>}

          </div>
        </form>
      </div>
    );
  }
}
