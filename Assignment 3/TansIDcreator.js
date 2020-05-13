const crypto = require("crypto");
const readline = require('readline');
const constants = require('constants');
const fs = require('fs');

const rl =readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

var inputarray=[];
var outputarray=[];
var i,o ;

class Input{
    constructor(TransID , index ,length_sign, signature){
        this.TransID = TransID;
        this.index = index;
        this.length_sign = length_sign;
        this.signature = signature;
    }
}
class Output{
    constructor(coins , length_pubkey , pubkey){
        this.coins = coins;
        this.length_pubkey = length_pubkey;;
        this.pubkey = pubkey;
    }
}

function publickey(path){
    let pem=fs.readFileSync(path);    
    let publicKey_ = pem.toString('utf-8');
    //const publicKeyBuf =  Buffer.from(publicKey_, 'ascii');
    //console.log(publicKey_);
    //return[publicKeyBuf.length , publicKeyBuf]
    return[publicKey_.length , publicKey_];
}
function transitionToByteArrayInput(buff,_transid , _index , _length_sign , _sign){
    var buf1 = Buffer.from(_transid,"hex");
    //console.log(buf1.length)
    var buf2 = Buffer.alloc(4);
    buf2.writeInt32BE(_index, 0);
    //console.log(buf2.length)
    var buf3 = Buffer.alloc(4);
    buf3.writeInt32BE(_length_sign, 0);
    //console.log(buf3.length)
    var buf4=Buffer.from(_sign , 'utf-8');
    //console.log(buf4.length)
    var buf = Buffer.concat([buff,buf1,buf2,buf3,buf4]);
    return buf ;
}
function transitionToByteArrayOutput(bufff,_coins , _length_pubkey , _pubkey){
 
    var buf1 = Buffer.alloc(8);
    buf1.writeBigInt64BE(BigInt(_coins), 0);
    var buf2 = Buffer.alloc(4);
    buf2.writeInt32BE(_length_pubkey, 0);
    var buf3=Buffer.from(_pubkey , 'utf-8');
    var buf = Buffer.concat([bufff,buf1,buf2,buf3]);
    return buf ;
}
const numinput= () =>{
    return new Promise((resolve, reject)=>{
        rl.question("Enter the number of inputs :",(num_inputs)=> {
             i =parseInt(num_inputs);  
             resolve()       
         });
    });
}
const numoutput= () =>{
    return new Promise((resolve, reject)=>{
        rl.question("Enter the number of outputs :",(num_outputs)=> {
             o =parseInt(num_outputs);  
             resolve()       
         });
    });
}
const questioninput= () =>{
    return new Promise((resolve, reject)=>{
        rl.question("Enter the transID :",(transid_)=>{
            rl.question("Enter the index :",    (index_)=>{
                rl.question("Enter the signature :",(sign_)=>{
                       
                      console.log(sign_);
                      inputarray.push(new Input(transid_ ,parseInt( index_),sign_.length, sign_));
                      resolve()       
                    });
               });
          });
    });
}
const questionoutput= () =>{
    return new Promise((resolve, reject)=>{
        rl.question("Enter the number of coins :",(coins_)=>{
            rl.question("Enter the path of public key :",    (publickey_path)=>{
                                       
                      var pubkey = publickey(publickey_path);
                      outputarray.push(new Output(parseInt(coins_), pubkey[0] , pubkey[1]));
                      resolve()       
                   
               });
          });
    });
}
function inputBuffer(){
    var bufi = Buffer.alloc(4)
    bufi.writeInt32BE(i,0);
    
    for (var j =0;j<i;j++){
       bufi = transitionToByteArrayInput(bufi,inputarray[j].TransID ,inputarray[j].index , inputarray[j].length_sign , inputarray[j].signature);
    }
    return bufi
}
function outputBuffer(){
    var bufo = Buffer.alloc(4);
    bufo.writeInt32BE(o,0);
    for (var j =0;j<o;j++){
      bufo = transitionToByteArrayOutput(bufo,outputarray[j].coins ,outputarray[j].length_pubkey , outputarray[j].pubkey);
    }
  return bufo
}

const main = async() =>{
   
    //takeinput()
    await numinput()
    for (var j =0 ; j<i;j++){
        await questioninput()
    }
    console.log(inputarray)
    //takeoutput()
    await numoutput()
    for (var j =0 ; j<o;j++){
        await questionoutput()
    }
    console.log(outputarray)
    //console.log(inputarray.length)
      var bufi =inputBuffer()
      var bufo =outputBuffer()
      
    // console.log(bufi.length);
    // console.log(bufi.toString('ascii'));
    // console.log(bufo.length);
    var buf = Buffer.concat([bufi , bufo]);
    // console.log(buf);
    // console.log(buf.length);
    hashed = crypto.createHash('sha256').update(buf).digest('hex');
    console.log(hashed);

    //writing file
    fs.writeFile(hashed+'.dat', buf, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    rl.close();
    
}

main()

