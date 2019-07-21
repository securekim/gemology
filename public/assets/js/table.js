TR_ID_CNT=0;

var _STATUS_ = [
    "TRANSFERED",
    "NEEDTRANSFER",
    "TORENT",
    "RENTED",
    "SOLD"
]

var _STATUS_SET_ = {
    TRANSFERED : {
        msg : "TRANSFERED",
        icon : "fa-thumbs-up",
        color : "green",
        enable : false
    },
    NEEDTRANSFER : {
        msg : "NEED TRANSFER",
        icon : "fa-thumbs-down",
        color : "red",
        enable : true}
    ,TORENT : {
        msg : "TO RENT",
        icon : "fa-retweet",
        color : "white",
        enable : true}
    ,RENTED : {
        msg : "RENTED",
        icon : "fa-retweet",
        color : "white",
        enable: false
    }, SOLD : {
        msg : "SOLD",
        icon : "fa-diamond",
        color : "green",
        enable : false
    }
}

function init(callback){
    $.ajax({
        url: '/codes',
        type: 'GET',
        cache: false, 
        data: "", 
        success: function(data){
            callback(data);
        }
        , error: function(jqXHR, textStatus, err){
            alert('Status '+textStatus+', err '+err)
        }
     });
}

function appendToTable(tdArr){
    tableContent = "<tr id=\"tr_"+TR_ID_CNT+"\">"
    TR_ID_CNT++;
    for(var i in tdArr){
        tableContent+="<td>"+tdArr[i]+"</td>";
    }
    tableContent+="</tr>"
    console.log(tableContent);
    $('#table').find('tbody').append( tableContent );
}

function makeCertButton(url, color, enable){
    if(typeof url == undefined || url =="" || url == null){
        url = "/images/dia_report.jpg";
        color = "white"
    }
    return '<a onclick="certClicked(\''+url+'\')" class="button small '+getColor(color)+' icon fa-download'+getEnable(enable)+'">CERT</a>'
}

function makeStatusButton(status, _onclick){
    console.log(status);
    if(_onclick == null) _onclick ="";
    return '<a'+_onclick+' class="button small '+getColor(_STATUS_SET_[status].color)+' icon '+_STATUS_SET_[status].icon+getEnable(_STATUS_SET_[status].enable)+'">'+_STATUS_SET_[status].msg+'</a>'
}


function getColor(color){
    if(color == "green"){
        return "success"
    } else if( color == "red"){
        return "primary"
    } else if( color == "white"){
        return "secondary"
    }
}

function getEnable(boolean){
    if(boolean) return "";
    return " disabled"
}

function ADD_GEMOLOGIST(diaCode, wholesaler, price){
    data = []
    cert = makeCertButton("#","green",true);
    status = makeStatusButton("NEEDTRANSFER", "")

    data.push(diaCode, wholesaler, price, status, cert);
    appendToTable(data);
}

function ADD_WHOLESALER(diaCode, owner, price, status){
    data = []
    cert = makeCertButton("#","green",true);
    console.log(TR_ID_CNT)
    _onclick = ' onclick="transferCert(\'tr_'+TR_ID_CNT+'\')"';
    console.log(_onclick)
    statusButton = makeStatusButton(status, _onclick);
    data.push(diaCode, owner, price, statusButton, cert);
    console.log(data)
    appendToTable(data);
}

//status = "TRANSFERED"
function CHANGE_WHOLESALER(tr_id, owner, price, status){
    console.log('CHANGE_WHOLESALER("' + tr_id + '","' +owner+ '","'+price+'","'+status+'")');
    //reportData["code"]    = $("#tr_"+tr_id).eq(0).find("td").eq(0).html()
    $("#"+tr_id).eq(0).find("td").eq(1).html(owner)
    $("#"+tr_id).eq(0).find("td").eq(2).html(price)
    if(status=="TORENT"){
        _onclick ="";
    } else {
        _onclick = ' onclick="transferCert(\''+tr_id+'\')"';
    }
    statusButton = makeStatusButton(status, _onclick)
    $("#"+tr_id).eq(0).find("td").eq(3).html(statusButton)
}


function ADD_RETAILER(diaCode, owner, price, status){
    data = []
    cert = makeCertButton("#","green",true);
    console.log(TR_ID_CNT)
    if(status=="TORENT"){
        _onclick = ' onclick="retailer_rent(\'tr_'+TR_ID_CNT+'\')"';
    } else {
        _onclick = "";
    }
    console.log(_onclick)
    statusButton = makeStatusButton(status, _onclick);
    data.push(diaCode, owner, price, statusButton, cert);
    console.log(data)
    appendToTable(data);
}

function CHANGE_RETAILER(tr_id, owner, price, status){
    console.log('CHANGE_RETAILER("' + tr_id + '","' +owner+ '","'+price+'","'+status+'")');
    //reportData["code"]    = $("#tr_"+tr_id).eq(0).find("td").eq(0).html()
    $("#"+tr_id).eq(0).find("td").eq(1).html(owner)
    $("#"+tr_id).eq(0).find("td").eq(2).html(price)
    if(status!="TORENT"){
        _onclick ="";
    } else {
        _onclick = ' onclick="retailer_rent(\''+tr_id+'\')"';
    }
    statusButton = makeStatusButton(status, _onclick)
    // "TRANSFERED",
    // "NEEDTRANSFER",
    // "TORENT",
    // "RENTED",
    // "SOLD"
    $("#"+tr_id).eq(0).find("td").eq(3).html(statusButton)
}


function certClicked(url){
    Swal.fire({
        title: 'GIA Certificate',
        text: 'Hanmi Gemological Institute Lab',
        imageUrl: '/images/dia_report.jpg',
        imageWidth: "200",
        imageHeight: "400",
        imageAlt: 'Certificate',
        animation: false
      })
    }