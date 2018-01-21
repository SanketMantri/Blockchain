const SHA256 = require(crypto-js/sha256)
class block{
    constructor(index, timeStamp, data, previousHash = '' )
    {
        this.index  = index
        this.timeStamp = timeStamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculatehash()
    }
    calculatehash(){
        return SHA256(this.index + this.timeStamp + JSON.stringify(this.data))
    }
}
class blockchain{
    constructor()
}