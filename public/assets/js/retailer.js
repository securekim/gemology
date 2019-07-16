
function retailer_rent() {
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
          Swal.fire(
            'Rented!',
            'Diamond has been rented.',
            'success'
          )
        }
      })
}