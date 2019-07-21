
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


function retailer_rent(tr_id){
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
              }
              , error: function(jqXHR, textStatus, err){
                  alert('text status '+textStatus+', err '+err)
              }
           })
      }
    })
}