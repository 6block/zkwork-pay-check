import {
  TransactionType,
  FindTransactionParameters,
} from '../interface/interface'
import Service from './service'

class TransactionService extends Service {
  constructor() {
    super('https://explorer.ironfish.network/api/transactions')
  }

  find(query: FindTransactionParameters): Promise<TransactionType> {
    return this.fetcher.get('/find', {
      params: query,
    })
  }

  toString(): string {
    return 'TransactionService'
  }
}

export default TransactionService
