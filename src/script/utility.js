import noteComponent from "./components/note.js";
import masonryGrid from "./components/masonry.js";
import { notes } from "./data/notesData.js";

function render(notesData){
  let data
  switch (notesData) {
    case "notes":
      data = notes.filter(note => !note.archived)
      break;
    case "archive":
      data = notes.filter(note => note.archived);
      break;
    case "trash":
      break;
  }

  const notesListContainer = document.querySelector('.notes-list');
  notesListContainer.innerHTML = "";

  data.forEach(note => {
    notesListContainer.appendChild(noteComponent(note));
  })

  masonryGrid.reloadItems()
  masonryGrid.layout()
}

export {render};