const SHA256 = require('crypto-js/SHA256');
class Block{
   constructor(index, timeStamp, data, previousHash = ''){
       this.index = index;
       this.timeStamp = timeStamp;
       this.data = data;
       this.previousHash = previousHash;
       this.hash = this.calculateHash();
   }
   calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
}
}
class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        }
    createGenesisBlock(){
        return new Block(0,"01/01/2018","Genesis Block","0000");

    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let bc1 = new BlockChain();
bc1.addBlock(new Block(1, "02/01/2018", 90));
bc1.addBlock(new Block(2, "12/01/2018", 89));

console.log(JSON.stringify(bc1, null, 4))