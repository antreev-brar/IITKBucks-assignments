const crypto = require("crypto");
const readline = require('readline');
const constants = require('constants');
const fs = require('fs');
const now = require('nano-time');
 

const rl =readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});
function findNonce(buf , target){
    var nonce = BigInt(0);
    var timestamp;
    var checkString;
    var bufNonce = Buffer.alloc(8);
    var bufTimestamp = Buffer.alloc(8);
    while(true){
        timestamp = BigInt(now());
        bufTimestamp.writeBigInt64BE(timestamp, 0);
        bufNonce.writeBigInt64BE(nonce, 0);
        var bufCheck = Buffer.concat([buf,bufTimestamp,bufNonce]);
        //console.log(bufCheck.length);
        checkString = crypto.createHash('sha256').update(bufCheck).digest('hex');
        if(checkString<target){
            break;
        }else{
            nonce = nonce + 1n ;
        }
    }
    return([checkString ,timestamp, nonce])  ; 
}


function blockHeader(index ,hash , target , path){

    var bufIndex = Buffer.alloc(4);
    bufIndex.writeInt32BE(index, 0);
    var bufHashParent = Buffer.from(hash,'hex');
    let data = fs.readFileSync(path);
    const hashBlock = crypto.createHash('sha256').update(Buffer.from(data)).digest('hex');
    var bufHashBlockbody = Buffer.from(hashBlock,'hex');
    var bufTarget = Buffer.from(target , 'hex');
    var buf = Buffer.concat([bufIndex,bufHashParent,bufHashBlockbody,bufTarget]);
    var ans = findNonce(buf,target);
    console.log("Hash calculated :"+ans[0]);
    console.log("Timestamp calculated :"+ans[1]);
    console.log("Nonce calculated :"+ans[2]);

}

rl.question("Index :",(index)=>{
    rl.question("Hash of parent block:",(hash)=>{
        rl.question("Target:",(target)=>{
            rl.question("Block Body:",(path)=>{
                
                console.log('Initial Timestamp'+now());
                //console.log(BigInt(now()));
                blockHeader(index , hash , target , path)
                rl.close();
            });
        });
    });
});