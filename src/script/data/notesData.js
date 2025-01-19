const notes = [];
let searchResults = [];
const STORAGE_KEY = 'notes';

function generateNoteObject(title, body){
  return {
    id: generateId(),
    title,
    body,
    timestamp: Date.now(),
    lastEdited: Date.now(),
    archived: false,
    color: generateRandomColor(),
    isDeleted: false,
    deleteAt: 0,
  }
}

function searchNote(keyword, category){
  const normalizedKeyword = normalizeString(keyword)
  let results;
  switch(category) {
    case "notes":
      results = notes.filter(note => !note.archived && !note.isDeleted);
      break;
    case "archive":
      results = notes.filter(note => note.archived & !note.isDeleted);
      break;
    case "trash":
      results = notes.filter(note => note.isDeleted);
      break;
  }

  searchResults = results.filter(note => {
    const normalizedTitle = normalizeString(note.title);
    const normalizedBody = normalizeString(note.body);

    return normalizedTitle.includes(normalizedKeyword) || normalizedBody.includes(normalizedKeyword);
  } );
}

function normalizeString(string){
  return string.toLowerCase().replace(/\s/g, '');
}

function moveToTrash(id){
  // notes.splice(findIndex(id), 1);
  const noteIndex = findIndex(id);
  notes[noteIndex].isDeleted = true;
  notes[noteIndex].deleteAt = Date.now() + (7 * 24 * 60 * 60 * 1000); // create epoch time 7 days from now
  notes[noteIndex].lastEdited = Date.now();
  saveData();
}

function restore(id){
  const noteIndex = findIndex(id);
  notes[noteIndex].isDeleted = false;
  notes[noteIndex].deleteAt = null
  notes[noteIndex].lastEdited = Date.now();

  saveData();
}

function deletePermanent(id){
  const noteIndex = findIndex(id);
  if(!noteIndex){
    console.log('id not found')
    return
  }
  notes.splice(findIndex(id), 1);
  saveData();
}

function autoDelete(){
  const count = setInterval(function() {
    const deletedNotes = notes.filter(note => note.isDeleted);
    if(deletedNotes.length > 0) {
      deletedNotes.forEach(note => {
        if(note.deleteAt < Date.now()){
          deletePermanent(note.id);
        }
      })
    } else {
      clearInterval(count);
    }
  }, 1000)

}

function updateNote(title, body, id){
  const noteIndex = findIndex(id);

  notes[noteIndex].title = title;
  notes[noteIndex].body = body;
  notes[noteIndex].lastEdited = Date.now();
  saveData();
}

function archiveNote(id){
  const noteIndex = findIndex(id);

  notes[noteIndex].archived = true;
  notes[noteIndex].lastEdited = Date.now();

  saveData();
}

function unarchiveNote(id){
  const noteIndex = findIndex(id);

  notes[noteIndex].archived = false;
  notes[noteIndex].lastEdited = Date.now();

  saveData();
}

function findIndex(id){
  for (const i in notes) {
    if (notes[i].id == id) {
      return i;
    }
  }
}

function insertNewNote(title, body){
  const newNote = generateNoteObject(title, body);
  notes.push(newNote);
  saveData();
}

// only call on first load, the rest will use noteArr memory
function loadDataStorage(){
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if(data !== null){
    for (const note of data) {
      notes.push(note);
    }
  }
}

function generateId(){
  return Date.now().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

function generateRandomColor(){
  const noteColors = ["taro", "teal", "blueberry", "emerald", "maroon", "yellow", "brown", "orange"];
  const groupStartIndex = Math.floor(notes.length / 8) * 8;
  const currentGroup = notes.slice(groupStartIndex);
  
  const usedColors = currentGroup.map(note => note.color);
  const availableColors = noteColors.filter(color => !usedColors.includes(color)); // // array warna tersedia yg nanti akan diakses berdasarkan index random

  return availableColors[Math.floor(Math.random() * availableColors.length)];
}

function saveData(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  autoDelete();
}

export {notes, loadDataStorage, insertNewNote, moveToTrash, updateNote, searchNote, archiveNote, unarchiveNote, deletePermanent, restore, autoDelete, searchResults};