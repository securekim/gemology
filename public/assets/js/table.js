function appendToTable(tdArr){
    tableContent = "<tr>"
    for(var i in tdArr){
        tableContent+="<td>"+tdArr[i]+"</td>";
    }
    $(table).find('tbody').append( tableContent );
}

function makeCertButton(url, color, enable){
    if(typeof url == undefined || url =="" || url == null){
        url = "#";
    }
    return '<a href="'+url+'" class="button small '+getColor(color)+' icon fa-download '+getEnable(enable)+'">CERT</a>'
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
    return "disabled"
}

function ADD_GEMOLOGIST(diaCode, information, price, button){
    data = []
    cert = makeCertButton(certURL,"hg");
    data.push(diaCode, information, price, cert);
    appendToTable(data);
}