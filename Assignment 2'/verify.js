const readline = require('readline');
const crypto = require('crypto');
const constants = require('constants');
const fs = require('fs');
const verify = crypto.createVerify('SHA256');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function veri(str,text , pubkey){
    let signatureSignedByPrivateKey = str
    let pem = pubkey
    let publicKey = pem.toString('ascii')
    const verifier = crypto.createVerify('SHA256')
    verifier.update(text, 'ascii')
    const publicKeyBuf =  Buffer.from(publicKey, 'ascii')
    const signatureBuf = Buffer.from(signatureSignedByPrivateKey, 'hex')
    const result = verifier.verify({key:publicKeyBuf, padding:crypto.constants.RSA_PKCS1_PSS_PADDING}, signatureBuf)
    return result;
}

rl.question('Enter a signature  ', (str) => {
    rl.question('Enter a unencrypted text ' , (text) => {
        rl.question('Enter a public key ', (path) =>{
            //console.log(str);
            //console.log(text);
            var pubkey =fs.readFileSync(path);
            //console.log(path);

            if(veri(str,text,pubkey)===true){
                console.log("Signature verified!");
            }
            else{
                console.log("Verification Failed");
            }
            rl.close();
        });
     
    });
});



