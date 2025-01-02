const optionButtons = document.querySelectorAll('.expand-option-button');

// toggle note options
optionButtons.forEach(optionBtn => {
  optionBtn.addEventListener('click', function(){

    // jika yg diklik sedang aktif tutup menu itu sendiri
    if(optionBtn.classList.contains('show')){
      optionBtn.classList.remove('show')
    }else {
      // jika yg diklik belum aktif, tutup semua menu
      for (const optionBtn of optionButtons) {
        optionBtn.classList.remove('show')
      }

      // check apakah tombol aktif jika tidakbuka menu dari button yang di klik
      if(!optionBtn.classList.contains('show')){
        optionBtn.classList.add('show')
      }
    }

  })
})

// sidebar show/hide
const expandMenuButton = document.querySelector('.expand-menu');
expandMenuButton.addEventListener('click', function(){
  document.querySelector('nav').classList.toggle('show')
})

// modal show/close pop up modal dialog
const modal = document.getElementById('modal');
const openModalButtons = document.querySelectorAll('#open-modal');
openModalButtons.forEach( openModal => {
  openModal.addEventListener('click', ()=> {
    modal.classList.add('show')
    document.body.style.overflow = "hidden";
  })
} )

const closeModal = document.getElementById('close-modal')
closeModal.addEventListener('click', ()=> {
  modal.classList.remove('show')
  document.body.style.overflow = "auto";
})
// close click anywhere outside modal dialog
modal.addEventListener('click', event => {
  if(event.target == modal){
    modal.classList.remove('show')
    document.body.style.overflow = "auto";
  }
})