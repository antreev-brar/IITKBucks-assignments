const crypto = require("crypto");
const readline = require('readline');
const fs = require('fs');
const now = require('nano-time');
 

const rl =readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

class BlockHead{
    constructor( index, hashParent ,hashBlockbody, target){
       this.index = index
       this.hashParent = hashParent
       this.hashBlockbody = hashBlockbody
       this.target = target
    }
}
let blockHeadObj= new BlockHead(0,'','','');

function miner(buf , target){
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

function blockHeader(index ,hash ,hashBlockbody, target){
    var t1 = BigInt(now());
    console.log("Initial Timestamp : " + t1);

    var bufIndex = Buffer.alloc(4);
    bufIndex.writeInt32BE(index, 0);
    var bufHashParent = Buffer.from(hash,'hex');
    var bufHashBlockbody = Buffer.from(hashBlockbody,'hex');
    var bufTarget = Buffer.from(target , 'hex');

    var buf = Buffer.concat([bufIndex,bufHashParent,bufHashBlockbody,bufTarget]);
    var ans = miner(buf,target);
    console.log("Hash calculated :"+ans[0]);
    console.log("Timestamp calculated :"+ans[1]);
    console.log("Nonce calculated :"+ans[2]);
    console.log('Time taken :'+ ((ans[1]-t1)/(1000000000n)+'s'));
}
const input= () =>{
    return new Promise((resolve, reject)=>{

        rl.question("Index :",(index)=>{
            rl.question("Hash of parent block:",(hash)=>{
                rl.question("Target:",(target)=>{
                    rl.question("Path of Block Body:",(path)=>{

                        let data = fs.readFileSync(path);
                        const hashBlockbody = crypto.createHash('sha256').update(Buffer.from(data)).digest('hex');
                        //console.log(BigInt(now()));
                         blockHeadObj = new BlockHead(index , hash ,hashBlockbody, target)
                         resolve() 

                    });
                });
            });
        }); 
    });
}



const main = async() => {
    await input();
    blockHeader(blockHeadObj.index , blockHeadObj.hashParent ,blockHeadObj.hashBlockbody , blockHeadObj.target);
    rl.close();
}
main()




