function appendToTable(tdArr){
    tableContent = "<tr>"
    for(var i in tdArr){
        tableContent+="<td>"+tdArr[i]+"</td>";
    }
    $('#table').find('tbody').append( tableContent );
}

function makeCertButton(url, color, enable){
    if(typeof url == undefined || url =="" || url == null){
        url = "/images/dia_report.jpg";
        color = "white"
    }
    return '<a onclick="certClicked(\''+url+'\')" class="button small '+getColor(color)+' icon fa-download '+getEnable(enable)+'">CERT</a>'
}

function makeStatusButton(thumbup){
    if(thumbup){ 
        thumb = "up"
        color = "green"
        msg = " Transfered "
    } else {
        thumb = "down"
        color = "red"
        msg = "Need transfer"
    }
    return '<a class="button small '+getColor(color)+' icon fa-thumbs-'+thumb+'">'+msg+'</a>'
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

function ADD_GEMOLOGIST(diaCode, wholesaler, price){
    data = []
    cert = makeCertButton("#","green",true);
    status = makeStatusButton(false)
    data.push(diaCode, wholesaler, price, status, cert);
    appendToTable(data);
}