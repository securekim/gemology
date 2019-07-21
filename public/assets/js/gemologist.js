
init((data)=>{
    console.log(data)
    for(var i in data){
        ADD_GEMOLOGIST(data[i].code, data[i].account, data[i].price, data[i].status);
    }
});

function submitReport(){
    var reportData = {};  
    reportData["account"      ]  = $('#demo-account')[0].value;
    reportData["code"         ]  = $('#demo-code')[0].value;
    reportData["carat"        ]  = $('#demo-carat')[0].value;
    reportData["price"        ]  = $('#demo-price')[0].value;
    reportData["cut"          ]  = $('#demo-cut option:selected').text();
    reportData["clarity"      ]  = $('#demo-clarity option:selected').text();
    reportData["fluorescence" ]  = $('#demo-fluorescence option:selected').text();
    reportData["priority"     ]  = $('#demo-priority option:selected').text();
    reportData["message"      ]  = $('#demo-message')[0].value;
    console.log(reportData);

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
                url: '/gemologist/report',
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
                      ADD_GEMOLOGIST(reportData.code,reportData.account,reportData.price,"NEEDTRANSFER")
                }
                , error: function(jqXHR, textStatus, err){
                    alert(jqXHR+'text status '+textStatus+', err '+err)
                }
             })
        }
      })


}
