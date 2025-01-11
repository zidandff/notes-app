const notes = [];
const STORAGE_KEY = 'notes';

function searchNote(keyword){
  const normalizedKeyword = normalizeString(keyword)
  const results = notes.filter(note => {
    const normalizedTitle = normalizeString(note.title);
    const normalizedBody = normalizeString(note.body);

    return normalizedTitle.includes(normalizedKeyword) || normalizedBody.includes(normalizedKeyword);
  } );
  
  return results
}

function normalizeString(string){
  return string.toLowerCase().replace(/\s/g, '');
}

function moveToTrash(id){
  // notes.splice(findIndex(id), 1);
  const noteIndex = findIndex(id);
  notes[noteIndex].isDeleted = true;
  notes[noteIndex].deleteAt = Date.now() + (10 * 1000);
  countDelete(noteIndex);
  saveData();
}

function restore(id){
  const noteIndex = findIndex(id);
  notes[noteIndex].isDeleted = false;
  notes[noteIndex].deleteAt = null
  
  saveData();
}

function countDelete(index) {
  // console.log(notes[index].deleteAt)
  const count = setInterval(() => {
    const now = Date.now();
    console.log(`${now} \n ${notes[index].deleteAt}`)
    if(now > notes[index].deleteAt){
      console.log('hapuss')
      notes.splice(index, 1);
      saveData();
      clearInterval(count);
    }
  }, 1000);
}

function deletePermanent(id){
  notes.splice(findIndex(id), 1);
  saveData();
}

function updateNote(title, body, id){
  const noteIndex = findIndex(id);

  notes[noteIndex].title = title;
  notes[noteIndex].body = body;
  saveData();
}

function archiveNote(id){
  const noteIndex = findIndex(id);

  notes[noteIndex].archived = true;
  saveData();
}

function unarchiveNote(id){
  const noteIndex = findIndex(id);

  notes[noteIndex].archived = false;
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

function loadDataStorage(){
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if(data !== null){
    for (const note of data) {
      notes.push(note);
    }
  }
}

function generateNoteObject(title, body){
  return {
    id: generateId(),
    title,
    body,
    timestamp: Date.now(),
    archived: false,
    color: generateRandomColor(),
    isDeleted,
    deleteAt,
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


// only call on first load, the rest will use noteArr memory
function saveData(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}


export {notes, loadDataStorage, insertNewNote, moveToTrash, updateNote, searchNote, archiveNote, unarchiveNote, deletePermanent, restore};