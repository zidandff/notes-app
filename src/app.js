import masonryGrid from './script/components/masonry.js';
import noteComponent from './script/components/note.js';
import {
  loadDataStorage,
  notes,
  searchNote,
  insertNewNote,
  updateNote,
  autoDelete,
  searchResults,
} from './script/data/notesData.js';
// import { render } from "./script/utility.js";

window.addEventListener('load', function () {
  masonryGrid.layout();
});

document.addEventListener('DOMContentLoaded', () => {
  loadDataStorage();
  dispatchRenderEvent('notes');
  autoDelete();

  const expandMenuButton = document.querySelector('.expand-menu');
  const searchForm = document.getElementById('search-form');
  const menuItemButtons = document.querySelectorAll('.nav-link');
  const noteForm = document.getElementById('add-note-form');
  const modal = document.getElementById('add-note-modal');
  const openModalBtns = document.querySelectorAll('.add-note-btn');
  const closeModal = document.getElementById('close-modal');
  const fullNoteModal = document.getElementById('full-note-modal');

  searchForm.addEventListener('submit', function (ev) {
    ev.preventDefault();
    const keywordInput = document.querySelector('.search-input').value;
    // const searchResults = searchNote(keywordInput.value);
    const activeTab = document.querySelector('.menu-item.active');

    searchNote(keywordInput, activeTab.id);
    dispatchRenderEvent('search');
  });

  // expand menu sidebar
  expandMenuButton.addEventListener('click', function () {
    document.querySelector('nav').classList.toggle('show');
    setTimeout(() => {
      masonryGrid.layout();
    }, 400);
  });

  // menu sidebar
  menuItemButtons.forEach((menuItem) => {
    menuItem.addEventListener('click', function () {
      // const target = ev.target.closest(".menu-item");
      const target = menuItem.id;
      menuItemButtons.forEach((menuItem) =>
        menuItem.classList.remove('active')
      );
      menuItem.classList.add('active');

      switch (target) {
        case 'notes':
          dispatchRenderEvent('notes');
          break;
        case 'archive':
          dispatchRenderEvent('archive');
          break;
        case 'trash':
          dispatchRenderEvent('trash');
          break;
      }
    });
  });

  // note form event handler
  noteForm.addEventListener('submit', function (ev) {
    ev.preventDefault();
    const titleInput = noteForm.querySelector('#title-input').value;
    const bodyInput = noteForm.querySelector('#note-body-input').value;
    const noteId = noteForm.querySelector('#note-id').value;
    const activeTab = document.querySelector('.menu-item.active');

    if (ev.submitter.id == 'add-note') {
      insertNewNote(titleInput, bodyInput);
    } else if (ev.submitter.id == 'edit-note') {
      updateNote(titleInput, bodyInput, noteId);
    }

    // determine which tab will be render after edit notes
    if (activeTab.id == 'notes') {
      dispatchRenderEvent('notes');
    } else if (activeTab.id == 'archive') {
      dispatchRenderEvent('archive');
    }
    noteForm.reset();
    modal.classList.remove('show');
  });

  // open modal
  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      document.getElementById('add-note').removeAttribute('hidden');
      document.getElementById('edit-note').setAttribute('hidden', '');

      noteForm.reset();
      modal.classList.add('show');
    });
  });

  // close modal
  closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  const closeFullNote = document.getElementById('close-full-note-modal');
  closeFullNote.addEventListener('click', () => {
    fullNoteModal.classList.remove('show');
  });

  // when user click outside modal dialog
  modal.addEventListener('click', (ev) => {
    if (ev.target == modal) {
      modal.classList.remove('show');
    }
  });
  fullNoteModal.addEventListener('click', (ev) => {
    if (ev.target == fullNoteModal) {
      fullNoteModal.classList.remove('show');
    }
  });
});

function renderEventHandler(event) {
  let data;
  switch (event.detail.renderType) {
    case 'notes':
      data = notes.filter((note) => !note.archived && !note.isDeleted);
      break;
    case 'archive':
      data = notes.filter((note) => note.archived & !note.isDeleted);
      break;
    case 'trash':
      data = notes.filter((note) => note.isDeleted);
      break;
    case 'search':
      data = searchResults;
  }

  const notesListContainer = document.querySelector('.notes-list');
  notesListContainer.innerHTML = '';

  // sorting object array
  // https://www.w3schools.com/js/js_array_sort.asp
  data = data.toSorted((a, b) => a.lastEdited - b.lastEdited).toReversed();
  data.forEach((note) => {
    notesListContainer.appendChild(noteComponent(note));
  });

  masonryGrid.reloadItems();
  masonryGrid.layout();
}

export function dispatchRenderEvent(renderType) {
  const renderEvent = new CustomEvent('render', { detail: { renderType } });
  document.dispatchEvent(renderEvent);
}

document.addEventListener('render', renderEventHandler);
