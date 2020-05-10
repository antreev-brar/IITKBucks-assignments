const readline = require('readline');
const crypto = require('crypto');
const constants = require('constants');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a text to be encrypted: ', str => {
    let encrypted = encrypt(str);
    console.log(encrypted);
    rl.close();
});

function encrypt(str) {
    var privKey = fs.readFileSync("privateKey.pem");
    /*var encmsg = crypto.privateEncrypt({key : privKey, padding: constants.RSA_PKCS1_PSS_PADDING}, Buffer.from(str, 'utf-8'));
    return encmsg.toString('hex');*/
    const sign = crypto.createSign('SHA256');
    sign.update(Buffer.from(str, 'utf8'));
    signature = sign.sign({key:privKey, padding:crypto.constants.RSA_PKCS1_PSS_PADDING}).toString('hex');
    return signature
}