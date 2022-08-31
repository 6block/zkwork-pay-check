import * as fs from "fs/promises";
import TransactionService from "./service/transactionService";
import PayoutService from "./service/payoutService";

const address = process.env.ADDRESS;
const output = process.env.OUTPUT;

if (!address) {
  console.error('Specify `ADDRESS` environment variable pointing to your mining address in ZK.Work');
  process.exit(1);
}

if (!output) {
  console.error('Specify `OUTPUT` environment variable with path to CSV file where results should be written');
  process.exit(2);
}

async function main(address: string, output: string) {
  const transactionService = new TransactionService()
  const payoutService = new PayoutService(address)
  const file = await fs.open(output, 'w');
  file.appendFile(
    `OnChainOrForked,Date,RewardType,TransactionHash,OnChainBlockHash,OnChainBlockSequence\n`,
  );
  const transactionList = await payoutService.recentPayout({page: 1, size: 200})
  for (const transaction of transactionList.data.records) {
    const transactionType = transaction.source === 0 ? 'MiningReward' : 'ZKWorkBonus'
    const hash = transaction.txId;
    const {blocks} = await transactionService.find({hash, with_blocks: true})
    const minedBlockIndex = blocks?.findIndex(block => block.main)
    if (blocks && minedBlockIndex && minedBlockIndex !== -1) {
      const targetBlock = blocks[minedBlockIndex]
      await file.appendFile(
        `OnChain,${transaction.date},${transactionType},${hash},${targetBlock.hash},${targetBlock.sequence}\n`,
      );
    } else {
      `Forked,${transaction.date},${transactionType},${hash}\n`
    }
  }

  await file.close();


  console.log('Finished successfully');

  process.exit(0);
}

main(address, output);
