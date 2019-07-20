
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

exports.init = function init(callback){
// killall nsd
// killall nscli
// rm -rf ~/.ns*
    ps.execSync("killall dcd");
    ps.execSync("killall dccli");
    ps.execSync("rm -rf ~/.ns*");

    ps.execSync(dcd+" unsafe-reset-all");
    ps.execSync(dcd+" init securekim --chain-id diachain");
    ps.execSync(dccli+" keys add gemologist");
    ps.execSync(dccli+" keys add wholesaler");
    ps.execSync(dccli+" keys add retailer");

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

    ps.exec(dcd+" start", (err,std,stderr)=>{
        callback(err, std, stderr);
    });
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
exports.gemologist_getList = async function(callback){
    getCodes((err, stdout, stderr)=>{
        if(err) return callback(stdout);
        var resultArr = [];
        for(var i in stdout){
            await getCode(stdout[i], (err, stdout, stderr)=>{
                if(!err) resultArr.push(stdout);
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
    exec(nscli+' tx nameservice buy-code '+code+' '+price+'nametoken --from '+name,(err,stdout,stderr)=>{
        callback(err, stdout, stderr);
    });
}

function setCode(code, measures, name, callback){
    exec(nscli+' tx nameservice set-code '+code+' '+measures+' --from '+name, (err, stdout, stderr)=>{
        callback(err, stdout, stderr);
    })
}

function getCodes(callback){
    // [
    //     "code12",
    //     "code13"
    // ]
    exec(nscli+' query nameservice codes', (err, stdout, stderr)=>{
        callback(err, stdout, stderr);
    })
}

//nscli query nameservice whichis $code
function getCode(code){
    return new Promise((resolve) => {
        exec(nscli+' query nameservice whichis '+code, (err, stdout, stderr)=>{
            resolve(err, stdout, stderr);
        })
     });
}
