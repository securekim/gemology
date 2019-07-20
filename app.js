
//////////////////

var express = require('express')
var app = express();
var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({extended:false})

app.use(express.static(__dirname + '/public'));

app.post('/ajax', urlencodedparser, function (req, res){  
   console.log(req);
   console.log('req received');
   res.redirect('/');

});

///////////////////



app.post('/gemologist/report',urlencodedparser, (req,res)=>{
    //req.body.value
    console.log(req.body);
    res.send(200, '블록체인에 등록 중입니다. 몇 주만 기다려 주세요.');  
});

//다른 경로를 요청했을때, 실제 그 경로에 있는 파일을 전달합니다.
app.get('/*', function(req, res) { 
 
 res.sendfile(req.url,function(err){
  console.log(err);
  res.send(403, '잘못된 접근입니다.');
 });
});
 
app.listen(80); //1024 이하의 포트는 특정 cap 권한이 필요합니다.
