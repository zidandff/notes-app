const masonryGrid = new Masonry('.notes-list', {
  itemSelector: '.note',
  percentPosition: true,
  gutter: 8,
});

document.addEventListener('DOMContentLoaded', ()=> {
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
  
  // expand menu sidebar
  const expandMenuButton = document.querySelector('.expand-menu');
  expandMenuButton.addEventListener('click', function(){
    document.querySelector('nav').classList.toggle('show')
    setTimeout(() => {
      masonryGrid.layout();
    }, 400);
  })

  // open modal
  const modal = document.querySelector('.modal');
  const openModalBtns = document.querySelectorAll('.add-note-btn');

  openModalBtns.forEach( btn => {
    btn.addEventListener('click', ()=> {
      modal.classList.add('show')
    })
  } )

  // close modal
  const closeModal = document.getElementById('close-modal');
  closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
  })

  // when user click outside modal dialog
  modal.addEventListener('click', (ev) => {
    if(ev.target == modal){
      modal.classList.remove('show')
    }
  })

})

window.addEventListener('load', ()=> {
  masonryGrid.layout();
})

