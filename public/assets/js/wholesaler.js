$("#demo-price").on("change keyup paste", function() {
    var currentVal = $(this).val();
    value = currentVal/10;
    if(currentVal == "" || isNaN(value)) value = ""

    $("#demo-deposit")[0].value = value;
});



init((data)=>{
    console.log(data)
    for(var i in data){
        ADD_WHOLESALER(data[i].code, data[i].account, data[i].price, data[i].status);
    }
});

function transferCert(tr_id){
    console.log(tr_id)
    var reportData = {};  
    reportData["code"]    = $("#"+tr_id).eq(0).find("td").eq(0).html()
    reportData["account"] = $("#"+tr_id).eq(0).find("td").eq(1).html()
    reportData["price"]   = $("#"+tr_id).eq(0).find("td").eq(2).html()
    var price = reportData["price"];
    console.log(reportData);
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, buy it!'
      }).then((result) => {
        if (result.value) {
            $.ajax({ 
                url: '/wholesaler/transfer',
                type: 'POST',
                cache: false, 
                data: reportData, 
                success: function(data){
                    Swal.fire({
                        position: 'middle',
                        type: 'success',
                        title: 'Your act has been requested',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      status = "TRANSFERED"
                      CHANGE_WHOLESALER(tr_id, "wholesaler", price, status);
                }
                , error: function(jqXHR, textStatus, err){
                    alert('text status '+textStatus+', err '+err)
                }
             })
        }
      })
}

function searchIDwithCode(code){
    for(i=1; i<$("#table").eq(0).find("tr").length; i++){
        if(code == $("#table").eq(0).find("tr").eq(i).find("td").html() 
        && $("#table").eq(0).find("tr").eq(i).find("td").eq(3).html().includes("TRANSFERED")){
            //$("#table").eq(0).find("tr").eq(2).find("td").eq(3).html().includes("TRANSFERED");
        return i;
        }
    }
    return -1;
}

function submitRent(){
    var reportData = {};  
    reportData["code"      ]  = $('#demo-code')[0].value;
    reportData["price"         ]  = $('#demo-price')[0].value;
    console.log(reportData);

    id = searchIDwithCode($('#demo-code')[0].value);
    if(id == -1) {
        alert("Check your code");
        return;
    }
    id -=1
    console.log("code : "+$('#demo-code')[0].value+" id:"+id)

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, report it!'
      }).then((result) => {
        if (result.value) {
            $.ajax({ 
                url: '/wholesaler/rent',
                type: 'POST',
                cache: false, 
                data: reportData, 
                success: function(data){
                    Swal.fire({
                        position: 'middle',
                        type: 'success',
                        title: 'Your report has been requested',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      CHANGE_WHOLESALER("tr_"+id,"wholesaler",reportData.price,"TORENT")
                }
                , error: function(jqXHR, textStatus, err){
                    alert('text status '+textStatus+', err '+err)
                }
             })
        }
      })
}
