var express     = require('express'),
    app         = express();
    bodyParser = require ("body-parser")
 
//public 폴더 밑에 있는 파일들을 요청이 있을때 접근 가능하도록 합니다.
app.use(express.static(__dirname+"/public")); 
app.use(bodyParser.json());
 
app.post('/evaluation', (req,res)=>{
    //req.body.value
    res.send(403, '블록체인에 등록 중입니다. 몇 주만 기다려 주세요.');  
});

app.post('/user', (req,res)=>{

    res.send(403, '블록체인에 등록 중입니다. 몇 주만 기다려 주세요.');  
});


//다른 경로를 요청했을때, 실제 그 경로에 있는 파일을 전달합니다.
app.get('/*', function(req, res) { 
 
 res.sendfile(req.url,function(err){
  console.log(err);
  res.send(403, '잘못된 접근입니다.');
 });
});
 
app.listen(80); //1024 이하의 포트는 특정 cap 권한이 필요합니다.
