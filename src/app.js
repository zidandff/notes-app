import noteComponent from "./script/components/note.js";
import masonryGrid from "./script/components/masonry.js";
import {notes, loadDataStorage, insertNewNote, updateNote, searchNote} from "./script/data/notesData.js";

export function render(notesData = notes){
  const notesListContainer = document.querySelector('.notes-list');
  notesListContainer.innerHTML = "";

  notesData.forEach(note => {
    notesListContainer.appendChild(noteComponent(note));
  })

  masonryGrid.reloadItems()
  masonryGrid.layout()
}

document.addEventListener('DOMContentLoaded', ()=> { 

  const noteForm = document.getElementById('add-note-form');
  const expandMenuButton = document.querySelector('.expand-menu');
  const modal = document.querySelector('.modal');
  const openModalBtns = document.querySelectorAll('.add-note-btn');
  const closeModal = document.getElementById('close-modal');
  const searchForm = document.getElementById('search-form');

  searchForm.addEventListener('submit', function(ev){
    ev.preventDefault();
    const keywordInput = document.querySelector('.search-input');
    const searchResults = searchNote(keywordInput.value);

    render(searchResults);
  })

  noteForm.addEventListener('submit', function(ev){
    ev.preventDefault();
    const titleInput = noteForm.querySelector('#title-input').value;
    const bodyInput = noteForm.querySelector('#note-body-input').value;
    const noteId = noteForm.querySelector('#note-id').value;

    if(ev.submitter.id == 'add-note'){
      insertNewNote(titleInput, bodyInput);
    } else if(ev.submitter.id == "edit-note"){
      updateNote(titleInput, bodyInput, noteId)
    }

    render();
    noteForm.reset();
    modal.classList.remove('show')
  })

  // expand menu sidebar
  expandMenuButton.addEventListener('click', function(){
    document.querySelector('nav').classList.toggle('show')
    setTimeout(() => {
      masonryGrid.layout();
    }, 400);
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

  loadDataStorage();
  render();
})

window.addEventListener('load', ()=> {
  masonryGrid.layout();
})

