const notes = [];
const STORAGE_KEY = 'notes';

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
    color: generateRandomColor()
  }
}

function generateId(){
  return Date.now().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

function generateRandomColor(){
  // array colors yg nanti akan diakses berdasarkan index random
  const noteColors = ["taro", "teal", "blueberry", "emerald", "maroon", "yellow", "brown", "orange"];
  const usedColors = notes.map(note => note.color); // arr warna yg sudah dipakai
  const availableColors = noteColors.filter(color => !usedColors.includes(color)); // warna yang belum dipakai didapatkan dari filter usedcolor dan notecolors

  // jika semua warna sudah dipakai buat random murni
  if(availableColors.length == 0){
    return noteColors[Math.floor(Math.random() * noteColors.length)];
  }

  // jika masih ada buat agar unique
  return availableColors[Math.floor(Math.random() * availableColors.length)];

  // TODO
  // BUAT FUNGSI AGAR WARNA SELALU UNIQUE SETIAP BLOCK 
  // SETIAP BLOCK ADALAH 8 NOTES(BERDASARKAN JUMLAH WARNA YG TERSEDIA)
  // JADI SETIAP KELIPATAN 8 NOTES WARNA SELALU UNIQUE
}

// only call on first load, the rest will use noteArr memory
function saveData(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}


export {notes, loadDataStorage, insertNewNote};