
function signup() {
	let timerInterval
Swal.fire({
  title: 'DIACHAIN',
  html: 'With blockchain',
  timer: 2000,
  onBeforeOpen: () => {
    Swal.showLoading()
    timerInterval = setInterval(() => {
      
    }, 100)
  },
  onClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  if (
    // Read more about handling dismissals
    result.dismiss === Swal.DismissReason.timer
  ) {
    console.log('I was closed by the timer')
    Swal.fire({
        position: 'middle',
        type: 'success',
        title: 'Your account has been saved',
        showConfirmButton: false,
        timer: 1500
      })
  }
})
}