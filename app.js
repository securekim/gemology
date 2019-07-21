
//////////////////

var blockchain = require('./blockchain.js');

var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({extended:false})
var CODES = [
    // {
    // code : "123",
    // account : "cosmos123",
    // price : "123",
    // status : "" 
    // }
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
            res.send(500, stderr);
         }
         res.send(200, resultArr.toString());  
       });
    console.log(req.body);
});

app.post('/gemologist/report',urlencodedparser, (req,res)=>{
    var measures = {carat: req.body.carat, cut: req.body.cut.replace(' ',''), clarity: req.body.clarity.replace(' ',''), fluorescence: req.body.fluorescence, priority: req.body.priority};
    blockchain.gemologist_buyCode(req.body.code, req.body.price, 'gemologist', measures,function(err, stdout, stderr) {
        if(err){
            res.send(500, stderr);
         }
         res.send(200, stdout);  
       });
    console.log(req.body);
    res.send(200, '블록체인에 등록 중입니다. 몇 주만 기다려 주세요.');
});

app.post('/wholesaler/rent',urlencodedparser, (req,res)=>{
    //req.body.value
    console.log(req.body);
    idx = search(req.body.code);
    CODES[idx].status = "TORENT";
    res.send(200, '블록체인에 등록 중입니다. 몇 주만 기다려 주세요.');  
});

app.get('/codes',(req,res)=>{
    res.send(CODES);
})

//다른 경로를 요청했을때, 실제 그 경로에 있는 파일을 전달합니다.
app.get('/*', function(req, res) { 
 
 res.sendfile(req.url,function(err){
  console.log(err);
  res.send(403, '잘못된 접근입니다.');
 });
});
 
app.listen(80); //1024 이하의 포트는 특정 cap 권한이 필요합니다.
