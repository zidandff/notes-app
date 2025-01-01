const optionButtons = document.querySelectorAll('.expand-option-button');

// toggle option 
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


const expandMenuButton = document.querySelector('.expand-menu');

expandMenuButton.addEventListener('click', function(){
  document.querySelector('nav').classList.toggle('show')
})