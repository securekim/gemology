
//////////////////

var blockchain = require('./blockchain.js');

var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var WebSocketServer = require('ws').Server;
var blockchain = require('./blockchain.js');

var wss = new WebSocketServer({port: 3100});
var urlencodedparser = bodyparser.urlencoded({extended:false})
var CODES = [
]
var ACCOUNTS = [

]

function search(code){
    for(var i in CODES){
        if(CODES[i].code == code){
            return i;
        }
    }
    return -1;
}

// "TRANSFERED",
// "NEEDTRANSFER",
// "TORENT",
// "RENTED",
// "SOLD"

app.use(express.static(__dirname + '/public'));

app.post('/ajax', urlencodedparser, function (req, res){  
   console.log(req);
   console.log('req received');
   res.redirect('/');

});

///////////////////

app.get('/gemologist/getcodes',urlencodedparser, (req,res)=>{
    blockchain.gemologist_getList(function(err, resultArr, stderr) {
        if(err){
            res.send(200, stderr);
         } else {
         res.send(200, resultArr.toString());  
         }
    });
    console.log(req.body);
});

app.post('/gemologist/report',urlencodedparser, (req,res)=>{
    var measures = {carat: req.body.carat.replace(/ /gi,""), cut: req.body.cut.replace(/ /gi,""), clarity: req.body.clarity.replace(/ /gi,""), fluorescence: req.body.fluorescence.replace(/ /gi,""), priority: req.body.priority};
    blockchain.gemologist_buyCode(req.body.code, req.body.price, 'gemologist', measures,function(err, stdout, stderr) {
        if(err){
            res.send(200, stderr);
         } else {
            res.send(200, stdout);
         }
       });
       if(search(req.body.code) == -1){
                CODES.push({code : req.body.code, account : req.body.account, price : req.body.price, status:"NEEDTRANSFER"});
       }
    console.log(req.body);
});
//"Command failed: /home/securekim/workspace/diachain/gemology/bin/dccli tx nameservice set-code avc 124 TripleExcellent Flawless Very strong D-G --from gemologist

app.post('/wholesaler/rent',urlencodedparser, (req,res)=>{
    //req.body.value
    console.log(req.body);
    idx = search(req.body.code);
    CODES[idx].status = "TORENT";
    res.send(200, {code:req.body.code, price:req.body.price});  
});

app.post('/wholesaler/transfer',urlencodedparser, (req,res)=>{
    //req.body.value
    console.log(req.body);
    idx = search(req.body.code);
    CODES[idx].status = "TRANSFERED";
    res.send(200, '블록체인에 등록 중입니다. 몇 주만 기다려 주세요.');  
});

app.post('/wholesaler/confirmRent',urlencodedparser, (req,res)=>{
    //req.body.value
    console.log(req.body);
    idx = search(req.body.code);
    CODES[idx].status = "RENTED";
    CODES[idx].account = req.body.account;
    res.send(200, {code:req.body.code});  
});


app.post('/retailer/rent',urlencodedparser, (req,res)=>{
    //req.body.value
    console.log(req.body);
    res.send(200, '블록체인에 등록 중입니다. 몇 주만 기다려 주세요.');  
});

app.get('/codes',(req,res)=>{
    //res.send(CODES);
    res.send(CODES);
    // blockchain.gemologist_getList(function(err, resultArr, stderr) {
    //  if(err){
    //      res.send(500, stderr);
    //   } else {
    //     res.send(200, resultArr.toString());
    //   }
    // });
    console.log(req.body);
})

//다른 경로를 요청했을때, 실제 그 경로에 있는 파일을 전달합니다.
app.get('/*', function(req, res) { 
 
 res.sendfile(req.url,function(err){
  console.log(err);
  res.send(403, '잘못된 접근입니다.');
 });
});
 

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        let sendData = {event: 'res', data: null};
        message = JSON.parse(message);
        switch (message.event) {
            case 'open':
                console.log("Received: %s", message.event);
                break;
            case "req":
                sendData.data = message.data;
                ws.send(JSON.stringify(sendData));
                break;
            case "rent":
            sendData.data = message.data;
            wss.clients.forEach(function each(client) {
                  client.send(JSON.stringify(sendData));
              });
            break;
            default:
        }
    });
});



app.listen(80); //1024 이하의 포트는 특정 cap 권한이 필요합니다.

process.on('uncaughtException', function (err) {
	//예상치 못한 예외 처리
	console.log('uncaughtException 발생 : ' + err);
});
