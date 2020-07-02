var crypto = require("crypto");
const { workerData,parentPort } = require('worker_threads');


console.log("workerData",workerData);
console.log('within worker');


function nonce(str){
    let comparedStr = '000000';
    for (let i = 0; i < 58; i++) {
        comparedStr += 'f';
    }
    let i = 0;
    let new_str;

    do {
        i++;
        new_str = str + i;
        hashed = crypto.createHash('sha256').update(new_str).digest('hex');
    } while (hashed >= comparedStr);

    return i;
}

parentPort.postMessage({nonce : nonce(workerData) , status : 200 });