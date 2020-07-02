var express = require("express");
var bodyParser =require("body-parser");
const { Worker, isMainThread,  workerData } = require('worker_threads');


var app = express();

var nonceFound = false ; 
var nonce = -1 ;

app.use(bodyParser.json({extended: false }));

app.get('/result', (req, res) => {
    var result = { "result":"searching","nonce":-1};
    if(nonceFound){
        result = { "result":"found","nonce":nonce};
    }
    res.json(result);
});

app.post('/start',(req,res,next)=>{

if(isMainThread) {
    console.log("this is the main thread")

    let workerone = new Worker('./worker.js',{ workerData: req.body.data });

    workerone.on('message',(data) => {
        console.log("message",data.nonce)
        nonceFound = true ;
        nonce = data.nonce ;
    })  
    workerone.on('error',(err) => {
        console.log(err);
    })
    workerone.on('exit',(code) => {
        if(code != 0) 
            console.error(`Worker stopped with exit code ${code}`)
    })
}
res.sendStatus(200);
});

app.listen(8000);
console.log("Listening on port 8000")