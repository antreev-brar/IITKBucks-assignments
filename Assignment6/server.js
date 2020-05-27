var express =require("express");
var bodyParser =require("body-parser");
var request = require('request');
var app = express();

app.use(bodyParser.json({extended: false }));

var peers = ['http://localhost:8000/add']
var map = new Map();
app.post('/add',function(req,res){
        console.log("you are in /add");
        console.log(req.body);
        if(!map.has(req.body.key)){
        map.set(req.body.key , req.body.value);
        console.log('added in map');


        var i;
        for (i = 0; i < peers.length; i++) { 
            console.log("Antreev-brar Sent "+req.body.key+" : "+req.body.value+" to  "+peers[i]);
            request.post(
                {
                url:peers[i],
                json: {
                  "key":req.body.key,
                  "value":req.body.value
                    },
                headers: {
                    'Content-Type': 'application/json'
                }
                },
              function(error, response, body){
                console.log("error  :" +error);
                //console.log(response);
                //console.log(JSON.stringify(body));
                res.send(body);
              });
            }
        
        }
        else{
            console.log('request ignored')
        }
        res.end();

})
function mapToObj(inputMap) {
    let obj = {};

    inputMap.forEach(function(value, key){
        obj[key] = value
    });

    return obj;
}
app.get('/list',function(req,res){
   
    console.log("you are in /list");
    console.log('returning map');
    res.send(JSON.stringify(mapToObj(map)));


})

const port =3000
app.listen(port,function(error){

    if(error){
        console.log("this thing is fucked")
    } else{
        console.log('server listening on port '+port)
    }
})