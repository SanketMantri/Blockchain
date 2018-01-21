const SHA256 = require('crypto-js/SHA256.js')
var index = 0;
let hashArr = [];
class block{
    
    constructor(index, timeStamp, data, previousHash = ''){
        this.index = index;
        this.timeStamp = timeStamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    calculateHash(){
        return SHA256(this.index + this.timeStamp + JSON.stringify(this.data)).toString();
    }
}
class blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new block(index,"01/01/2018","Genesis Block",{amount:500});
    }
    getLatestblock(){
        return this.chain[this.chain.length-1];
    }
    assignIndex(){
        return index = index + 1;
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestblock().hash;
        newBlock.hash = newBlock.calculateHash();
        newBlock.index = this.assignIndex();
        this.chain.push(newBlock)
    }
    isChainValid(){
        for (let i = 1;i < this.chain.length; i ++)
        {
            const currBlock = this.chain[i];
            const preBlock = this.chain[i-1]
            // if(currBlock.hash !== currBlock.calculateHash()){
            //     console.log("Current block hash:" + currBlock.hash)
            //     console.log("Calculate hash:"+currBlock.calculateHash())
            //     return false
            // }
            if(currBlock.previousHash !== preBlock.hash)
            {
                return false
            }
        return true
        }
    }
    checkHashCalculation(){
        console.log(this.chain[2].hash)
        console.log(this.chain[2].calculateHash())
    }
}

let bc1 = new blockchain();
bc1.addBlock(new block("04/01/2018",{amount : 40}))
bc1.addBlock(new block("20/01/2018",{amount: 200}))
bc1.addBlock(new block("10/01/2014",{amount : 400}))
// bc1.isChainValid();
console.log("Block details....")
console.log(JSON.stringify(bc1, null, 4))
console.log("Is chain verified??" + bc1.isChainValid())
console.log("checking hash calculation..")
bc1.checkHashCalculation()
