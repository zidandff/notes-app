import masonryGrid from "./script/components/masonry.js";
import { searchNote } from "./script/data/notesData.js";
import home from "./script/view/home.js";
import { render } from "./script/utility.js";

window.addEventListener('load', function(){
  masonryGrid.layout();
})

document.addEventListener('DOMContentLoaded', ()=> { 
  home();

  const expandMenuButton = document.querySelector('.expand-menu');
  const searchForm = document.getElementById('search-form');
  const menuItemButtons = document.querySelectorAll('.nav-link');

  searchForm.addEventListener('submit', function(ev){
    ev.preventDefault();
    const keywordInput = document.querySelector('.search-input');
    const searchResults = searchNote(keywordInput.value);

    render(searchResults);
  })


  // expand menu sidebar
  expandMenuButton.addEventListener('click', function(){
    document.querySelector('nav').classList.toggle('show')
    setTimeout(() => {
      masonryGrid.layout();
    }, 400);
  })

  // menu sidebar
  menuItemButtons.forEach(menuItem => {
    menuItem.addEventListener('click', function(ev){
      const target = ev.target;
      menuItemButtons.forEach(menuItem => menuItem.classList.remove('active'));
      target.classList.add('active')

      switch (target.id) {
        case "notes":
          render('notes');
          break;
        case "archive":
          render('archive');
          break;
        case "trash":
          // home();
          break;
      }
    })
  })

})