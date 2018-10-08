const SHA256 = require('crypto-js/sha256');
const { SmartContracts } = require('./SmartContracts');

class Block {
  constructor(timestamp, transactions, previousBlockNumber, previousHash = '') {
    this.blockNumber = previousBlockNumber + 1;
    this.refSteemBlockNumber = transactions.length > 0 ? transactions[0].refSteemBlockNumber : 0;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.hash = this.calculateHash();
    this.merkleRoot = '';
  }

  // calculate the hash of the block
  calculateHash() {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions))
      .toString();
  }

  // calculate the Merkle root of the block ((#TA + #TB) + (#TC + #TD) )
  calculateMerkleRoot(transactions) {
    if (transactions.length <= 0) return '';

    const tmpTransactions = transactions.slice(0, transactions.length);
    const newTransactions = [];
    const nbTransactions = tmpTransactions.length;

    for (let index = 0; index < nbTransactions; index += 2) {
      const left = tmpTransactions[index].hash;
      const right = index + 1 < nbTransactions ? tmpTransactions[index + 1].hash : left;

      newTransactions.push({ hash: SHA256(left + right).toString() });
    }

    if (newTransactions.length === 1) {
      return newTransactions[0].hash;
    }

    return this.calculateMerkleRoot(newTransactions);
  }

  // produce the block (deploy a smart contract or execute a smart contract)
  produceBlock(ipc, jsVMTimeout) {
    return new Promise(async (resolve) => {
      const nbTransactions = this.transactions.length;
      for (let i = 0; i < nbTransactions; i += 1) {
        const transaction = this.transactions[i];
        const {
          sender,
          contract,
          action,
          payload,
        } = transaction;

        let logs = null;

        if (sender && contract && action) {
          if (contract === 'contract' && action === 'deploy' && payload) {
            logs = await SmartContracts.deploySmartContract(// eslint-disable-line no-await-in-loop
              ipc, transaction, jsVMTimeout,
            );
          } else {
            logs = await SmartContracts.executeSmartContract(// eslint-disable-line no-await-in-loop
              ipc, transaction, jsVMTimeout,
            );
          }
        } else {
          logs = { errors: ['the parameters sender, contract and action are required'] };
        }

        // console.log('transac logs', logs);
        transaction.addLogs(logs);
      }

      this.hash = this.calculateHash();
      this.merkleRoot = this.calculateMerkleRoot(this.transactions);
      resolve();
    });
  }
}

module.exports.Block = Block;
