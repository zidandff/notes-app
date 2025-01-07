import noteComponent from "./script/components/note.js";
import masonryGrid from "./script/components/masonry.js"

const STORAGE_KEY = 'notes';
const notesArr = [];

function render(){
  const notesListContainer = document.querySelector('.notes-list');
  notesListContainer.innerHTML = "";

  notesArr.forEach(note => {
    notesListContainer.appendChild(noteComponent(note));
  })

  masonryGrid.reloadItems()
  masonryGrid.layout()
}


function addNewNote(){
  const titleInput = document.querySelector('#title-input').value;
  const bodyInput = document.querySelector('#note-body-input').value;
  const newNote = generateNoteObject(titleInput, bodyInput);
  
  notesArr.push(newNote);
  saveData();
}

// only call on first load, the rest will use noteArr memory
function loadDataStorage(){
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if(data !== null){
    for (const note of data) {
      notesArr.push(note);
    }

  }
}

function saveData(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notesArr));
  render();
}

function generateNoteObject(title, body){
  return {
    id: generateId(),
    title,
    body,
    timestamp: Date.now(),
    archived: false,
  }
}

function generateId(){
  return Date.now().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

document.addEventListener('DOMContentLoaded', ()=> { 
  const noteForm = document.getElementById('add-note-form');
  const expandMenuButton = document.querySelector('.expand-menu');
  const modal = document.querySelector('.modal');
  const openModalBtns = document.querySelectorAll('.add-note-btn');
  const closeModal = document.getElementById('close-modal');

  noteForm.addEventListener('submit', function(ev){
    addNewNote();
    noteForm.reset();
    modal.classList.remove('show')
    ev.preventDefault();
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

