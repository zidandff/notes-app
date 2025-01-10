import {render} from "../utility.js";
import {loadDataStorage, insertNewNote, updateNote} from "../data/notesData.js";

function home(){
  loadDataStorage();
  render('notes');
  
};

export default home;



