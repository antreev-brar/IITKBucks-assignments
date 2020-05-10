const crypto = require('crypto');
const fs = require('fs');
const constants = require('constants');


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 

function signature(){
    var id = makeid(20);
    
    var privkey =fs.readFileSync('privateKey.pem');
    console.log(id); 
    const signer = crypto.createSign('SHA256');
    signer.update(Buffer.from(id, 'utf8'));
    const signature = signer.sign({key:privkey,padding:crypto.constants.RSA_PKCS1_PSS_PADDING}).toString('hex');
    console.log(signature)
    //console.log("end----")
}

console.log(signature());
