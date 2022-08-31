import {
  GetPayoutParameters,
  PayResponse
} from '../interface'
import Service from './service'

class PayoutService extends Service {
  constructor(address: string) {
    super(`https://zk.work/api/ironfish/miner/${address}`)
  }

  recentPayout(query: GetPayoutParameters): Promise<PayResponse> {
    return this.fetcher.get('/recentPayouts', {
      params: query,
    })
  }

  toString(): string {
    return 'PayoutService'
  }
}

export default PayoutService
