const crypto = require("crypto");
const readline = require('readline');
const constants = require('constants');
const fs = require('fs');

const rl =readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

function details(dat){
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
        console.log("\t\tSignature :"+sign_buf.toString('utf-8'));
        i=i+length;
        console.log("\n");
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
    }
    console.log("\n");

}

rl.question("Enter the path :",(path)=>{
    let dat=fs.readFileSync(path);
    //console.log(dat.length);
    console.log("Transaction ID: "+path.substring(0,32));
    details(dat)
    rl.close();

});