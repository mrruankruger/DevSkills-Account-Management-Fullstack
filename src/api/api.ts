import { uuidv4 } from '../helperFuncions/helpers'

export class API {

  hostURL = 'http://localhost:8000';

  async postTransactrions(accountID: any, amount: number): Promise<any> {
    let bodyObj = {
      "account_id": accountID,
      "amount": amount
    }
    return await fetch(this.hostURL + `/amount`, {
      method: 'post',
      headers: {
        "Content-Type": 'application/json',
        "Transaction-Id": uuidv4() //create unique transactionID for each transaction
      },
      body: JSON.stringify(bodyObj)
    }).then(res => res.text()).then(data => {
      return data
    }).catch((err) => {
      return err
    })


  }

  async getBalance(accountID: any): Promise<any> {
    return await fetch(this.hostURL + `/balance/${accountID}`, {
      method: 'get'
    }).then(res => res.json()).then(data => {
      return data
    }).catch((err) => {
      return err
    })
  }

  async getTransactrions(): Promise<any> {
    return await fetch(this.hostURL + `/api/transactions`, {
      method: 'get',
      headers: {

      }
    }).then(res => res.json()).then(data => {
      return data
    }).catch((err) => {
      return err
    })
  }

}

export const api = new API()