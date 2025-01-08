import {render} from "../utility.js";
import {loadDataStorage, insertNewNote, updateNote} from "../data/notesData.js";

function home(){
  loadDataStorage();
  render('notes');

  const noteForm = document.getElementById('add-note-form');
  const modal = document.querySelector('.modal');
  const openModalBtns = document.querySelectorAll('.add-note-btn');
  const closeModal = document.getElementById('close-modal');

  // note form event handler
  noteForm.addEventListener('submit', function(ev){
    ev.preventDefault();
    const titleInput = noteForm.querySelector('#title-input').value;
    const bodyInput = noteForm.querySelector('#note-body-input').value;
    const noteId = noteForm.querySelector('#note-id').value;

    if(ev.submitter.id == 'add-note'){
      insertNewNote(titleInput, bodyInput);
    } else if(ev.submitter.id == "edit-note"){
      updateNote(titleInput, bodyInput, noteId);
    }

    render("notes");
    noteForm.reset();
    modal.classList.remove('show')
  })

  // open modal
  openModalBtns.forEach( btn => {
    btn.addEventListener('click', ()=> {
      document.getElementById('add-note').removeAttribute('hidden')
      document.getElementById('edit-note').setAttribute('hidden', '')

      noteForm.reset();
      modal.classList.add('show')
    })
  } )

  // close modal
  closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
  })

  // when user click outside modal dialog
  modal.addEventListener('click', (ev) => {
    if(ev.target == modal){
      modal.classList.remove('show')
    }
  })
  
};

export default home;



