export interface BlockType {
  id: number | string
  hash: string
  main: boolean
  difficulty: number | string
  previous_block_hash: string
  sequence: number
  size: number
  time_since_last_block_ms: number
  timestamp: string
  transactions_count: number
  transactions?: TransactionType[]
}

export interface TransactionType {
  fee: string
  hash: string
  blocks?: BlockType[]
}

export interface FindTransactionParameters {
  hash?: string
  with_blocks?: boolean
}

export interface GetPayoutParameters {
  page: number
  size: number
}

export interface PayResponse {
  data: {
    records: PayRecord[]
  }
}

export interface PayRecord {
  amount: number
  date: string
  source: number
  status: number
  txId: string
  userAddress: string
}
