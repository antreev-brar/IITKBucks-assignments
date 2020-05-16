const crypto = require("crypto");
const readline = require('readline');
const constants = require('constants');
const fs = require('fs');

const rl =readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

class Input {
    constructor (transactionID, index, sign_length, sign) {
        this.transactionID = transactionID;
        this.index = index;
        this.sign_length = sign_length;
        this.sign = sign;
    }
}

class Output {
    constructor (coins, pubkey_len, pub_key){
        this.coins = coins;
        this.pubkey_len = pubkey_len;
        this.pub_key = pub_key;
    }
}

function details(dat){
    const transactionID_I = crypto.createHash('sha256').update(Buffer.from(dat)).digest('hex');
    console.log("Transaction ID: "+transactionID_I );
    let Inputs = []
    let Outputs = [];

    var i=0;
    var num_inputsBuf = dat.slice(i,i+4);
    var num_inputs = num_inputsBuf.readInt32BE(0);
    console.log("Number of inputs:"+num_inputs+'\n');
    i=i+4;
    for(var j=1;j<=num_inputs;j++){
        console.log("\t Input "+j+": ");
        var transid =dat.slice(i,i+32);
        console.log("\t\tTransactionID :"+transid.toString('hex'));
        i=i+32;

        var indexBuf =dat.slice(i,i+4);
        var index = indexBuf.readInt32BE(0);
        console.log("\t\tIndex:"+index);
        i=i+4;

        var length_sign_buf = dat.slice(i,i+4);
        var length = length_sign_buf.readInt32BE(0);
        console.log("\t\tLength of Signature:"+length);
        i=i+4;

        var sign_buf = dat.slice(i,i+length);
        console.log("\t\tSignature :"+sign_buf.toString('hex'));
        i=i+length;
        console.log("\n");
        let In = new Input(transid.toString('hex'), index,length,sign_buf.toString('hex') );
        Inputs.push(In);
    }
    console.log("\n");

    var num_outputsBuf = dat.slice(i,i+4);
    var num_outputs = num_outputsBuf.readInt32BE(0);
    console.log("Number of outputs:"+num_outputs+'\n');
    i=i+4;
    for(var j=1;j<=num_outputs;j++){
        console.log("\t Output "+j+": ");
        

        var coinsBuf =dat.slice(i,i+8);
        var coins = coinsBuf.readBigUInt64BE(0);
        console.log("\t\tNumber of coins:"+Number(coins));
        i=i+8;

        var length_pubkey_buf = dat.slice(i,i+4);
        var length_pubkey = length_pubkey_buf.readInt32BE(0);
        console.log("\t\tLength of Public key:"+length_pubkey);
        i=i+4;

        var pubkey_buf = dat.slice(i,i+length_pubkey);
        console.log("\t\tPublic Key :"+pubkey_buf.toString('utf-8'));
        i=i+length_pubkey;
        console.log("\n");

        let Out = new Output(Number(coins), length_pubkey, pubkey_buf.toString('utf-8'));
        Outputs.push(Out);
    }
    console.log("\n");

}

rl.question("Enter the path :",(path)=>{
    let dat=fs.readFileSync(path);
    //console.log(dat.length);
    
    details(dat)
    rl.close();

});