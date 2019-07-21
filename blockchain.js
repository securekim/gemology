
var ps = require('child_process');
var dccli = __dirname+'/bin/dccli'
var dcd = __dirname+'/bin/dcd'

// child = exec("pwd", function (error, stdout, stderr) {
//     console.log('stdout: ' + stdout);
//     console.log('stderr: ' + stderr);
//     if (error !== null) {
//         console.log('exec error: ' + error);
//     }
// });
//init();
function init(){
// killall nsd
// killall nscli
// rm -rf ~/.ns*
    try{
    ps.execSync("killall dcd");
    }catch(e){}

    try{
    ps.execSync("killall dccli");
}catch(e){}
try{
ps.execSync("rm -rf ~/.ns*");
}catch(e){}
try{
    ps.execSync(dcd+" unsafe-reset-all");
}catch(e){}
    try{
    ps.execSync(dcd+" init securekim --chain-id diachain");
}catch(e){}
    try{
    ps.execSync(dccli+" keys add gemologist");
}catch(e){}
    try{
    ps.execSync(dccli+" keys add wholesaler");
}catch(e){}
    try{
    ps.execSync(dccli+" keys add retailer");
}catch(e){}
    ps.execSync(dcd+" add-genesis-account $("+dccli+" keys show gemologist -a) 100nametoken,100000000stake");
    ps.execSync(dcd+" add-genesis-account $("+dccli+" keys show wholesaler -a) 1500nametoken,100000000stake");
    ps.execSync(dcd+" add-genesis-account $("+dccli+" keys show retailer -a) 1000nametoken,100000000stake");

    ps.execSync(dccli+" config chain-id diachain");
    ps.execSync(dccli+" config output json");
    ps.execSync(dccli+" config indent true");
    ps.execSync(dccli+" config trust-node true");

    ps.execSync(dcd+" gentx --name gemologist");
//    ps.execSync(dcd+" gentx --name wholesaler");
//    ps.execSync(dcd+" gentx --name retailer");

    ps.execSync(dcd+" collect-gentxs");
    ps.exec(dcd+" start&")
}

//buy code and set code
exports.gemologist_buyCode = function(code, price, name, measures, callback){
    buyCode(code, price, name, (err, stdout, stderr)=>{
        if(err){
            return callback(err, stdout, stderr);
        }
        setCode(code, measures, name, (err, stdout, stderr)=>{
            return callback(err, stdout, stderr);
        });
    });
};

//getCodes, getCode
exports.gemologist_getList = function(callback){
    var resultArr = new Array();
    getCodes((err, stdout, stderr)=>{
        if(err) return callback(stderr);
        var codes = stdout.split('"');
        for(var i in codes){
            if(codes[i].search('\n') != -1) continue;
            getCode(codes[i], (code)=>{
                resultArr.push(code.toString());
            })
        }
        callback(err, resultArr, stderr);
    })
}

//get address, amount, publickey
exports.getAccount = function getAccount(name,callback){
    ps.exec(nscli + ' query account $('+nscli+' keys show '+name+' -a)',(err,stdout,stderr)=>{
        callback(err,stdout,stderr);
    })
    // {
    //     "type": "auth/Account",
    //     "value": {
    //       "address": "cosmos10a5u8ew6zgx9f646v2zmj9nawdk0gzyvxdm69l",
    //       "coins": [
    //         {
    //           "denom": "nametoken",
    //           "amount": "290"
    //         }
    //       ],
    //       "public_key": {
    //         "type": "tendermint/PubKeySecp256k1",
    //         "value": "AjbP053XIiuurrn1MlJxETlGnPhzDr2RHsI53w+olUAf"
    //       },
    //       "account_number": "0",
    //       "sequence": "9"
    //     }
    //   }
}

function buyCode(code, price, name, callback){
    ps.exec(dccli+' tx nameservice buy-code '+code+' '+price+'nametoken --from '+name,(err,stdout,stderr)=>{
        callback(err, stdout, stderr);
    });
}

function setCode(code, measures, name, callback){
    ps.exec(dccli+' tx nameservice set-code '+code+' '+measures.carat+' '+measures.cut+' '+measures.clarity+' '+measures.fluorescence+' '+measures.priority+' --from '+name, (err, stdout, stderr)=>{
        callback(err, stdout, stderr);
    })
}

function getCodes(callback){
    ps.exec(dccli+' query nameservice codes', (err, stdout, stderr)=>{
        callback(err, stdout, stderr);
    })
}

//nscli query nameservice whichis $code
function getCode(code, callback){
    return callback(ps.execSync(dccli+' query nameservice whichis '+code));
}
