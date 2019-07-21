
// function retailer_rent(id) {
// 	Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         type: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, rent it!'
//       }).then((result) => {
//         if (result.value) {
//           Swal.fire(
//             'Rented!',
//             'Diamond has been rented.',
//             'success'
//           )
//         }
//       })
// }


var ws = new WebSocket('ws://localhost:3100');

ws.onmessage = (event) => {
    console.log(event.data);
    let recData = JSON.parse(event.data);
    switch (recData.event) {
        case 'rent':
            alert(recData.data.comment);
            break;
        default:
    }
}

function isOK(code) {
    let sendData = {event: 'req', data: {}};
    ws.send(JSON.stringify(sendData));
}

init((data)=>{
  console.log(data)
  for(var i in data){
      ADD_RETAILER(data[i].code, data[i].account, data[i].price, data[i].status);
  }
});

function retailer_rent(tr_id){
  console.log(tr_id)
  var reportData = {};  
  reportData["code"]    = $("#"+tr_id).eq(0).find("td").eq(0).html()
  reportData["account"] = $("#"+tr_id).eq(0).find("td").eq(1).html()
  reportData["price"]   = $("#"+tr_id).eq(0).find("td").eq(2).html()
  var price = reportData["price"];
  var code = reportData["code"];
  console.log(reportData);
  Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, rent it!'
    }).then((result) => {
      if (result.value) {
          $.ajax({ 
              url: '/retailer/rent',
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
                    status = "TORENT"
                    //CHANGE_RETAILER(tr_id, "wholesaler", price, status);

                      let sendData = {event: 'rent', data: {code:code, account:"wholesaler", price:price, status:status}};
                      ws.send(JSON.stringify(sendData));
                    
              }
              , error: function(jqXHR, textStatus, err){
                  alert('text status '+textStatus+', err '+err)
              }
           })
      }
    })
}