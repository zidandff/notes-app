import { archiveNote, unarchiveNote, moveToTrash, deletePermanent, restore } from "../data/notesData.js";
import {dispatchRenderEvent} from "../../app.js"
// import { render } from "../utility.js";

export default function noteComponent({id, title, body, timestamp, color, archived, isDeleted}){
  const noteComponent = document.createElement('div');
  
  const month = ['Jan', 'Feb', 'Mar', "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const d = new Date(timestamp);
  
  noteComponent.classList.add('note');
  noteComponent.classList.add(color);
  noteComponent.id = id;
  noteComponent.innerHTML = `
        <div>
          <span class="note-date">${d.getDate()} ${month[d.getMonth()]}</span>
          <h2 class="note-title">${title}</h2>
          <p class="note-body">${body}</p>
        </div>
        <div class="note-action-wrapper ">
          <button class="expand-option-button">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.99984 11.3333C8.35346 11.3333 8.6926 11.4738 8.94265 11.7239C9.1927 11.9739 9.33317 12.313 9.33317 12.6667C9.33317 13.0203 9.1927 13.3594 8.94265 13.6095C8.6926 13.8595 8.35346 14 7.99984 14C7.64622 14 7.30708 13.8595 7.05703 13.6095C6.80698 13.3594 6.6665 13.0203 6.6665 12.6667C6.6665 12.313 6.80698 11.9739 7.05703 11.7239C7.30708 11.4738 7.64622 11.3333 7.99984 11.3333ZM7.99984 6.66667C8.35346 6.66667 8.6926 6.80714 8.94265 7.05719C9.1927 7.30724 9.33317 7.64638 9.33317 8C9.33317 8.35362 9.1927 8.69276 8.94265 8.94281C8.6926 9.19286 8.35346 9.33333 7.99984 9.33333C7.64622 9.33333 7.30708 9.19286 7.05703 8.94281C6.80698 8.69276 6.6665 8.35362 6.6665 8C6.6665 7.64638 6.80698 7.30724 7.05703 7.05719C7.30708 6.80714 7.64622 6.66667 7.99984 6.66667ZM7.99984 2C8.35346 2 8.6926 2.14048 8.94265 2.39052C9.1927 2.64057 9.33317 2.97971 9.33317 3.33333C9.33317 3.68696 9.1927 4.02609 8.94265 4.27614C8.6926 4.52619 8.35346 4.66667 7.99984 4.66667C7.64622 4.66667 7.30708 4.52619 7.05703 4.27614C6.80698 4.02609 6.6665 3.68696 6.6665 3.33333C6.6665 2.97971 6.80698 2.64057 7.05703 2.39052C7.30708 2.14048 7.64622 2 7.99984 2Z" fill="#EAEAEA"/>
            </svg>
          </button>
          <div class="action-list">
            <button class="edit" ${isDeleted ? 'hidden' : ''}>
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 14H14" stroke="#EAEAEA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.66699 11.3333V8.66667L11.3337 2L14.0003 4.66667L7.33366 11.3333H4.66699Z" stroke="#EAEAEA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.33301 4L11.9997 6.66667" stroke="#EAEAEA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="delete" ${isDeleted ? 'hidden' : ''}>
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.66699 14C4.30033 14 3.98655 13.8696 3.72566 13.6087C3.46477 13.3478 3.33411 13.0338 3.33366 12.6667V4C3.14477 4 2.98655 3.936 2.85899 3.808C2.73144 3.68 2.66744 3.52178 2.66699 3.33333C2.66655 3.14489 2.73055 2.98667 2.85899 2.85867C2.98744 2.73067 3.14566 2.66667 3.33366 2.66667H6.00033C6.00033 2.47778 6.06433 2.31956 6.19233 2.192C6.32033 2.06444 6.47855 2.00044 6.66699 2H9.33366C9.52255 2 9.681 2.064 9.809 2.192C9.937 2.32 10.0008 2.47822 10.0003 2.66667H12.667C12.8559 2.66667 13.0143 2.73067 13.1423 2.85867C13.2703 2.98667 13.3341 3.14489 13.3337 3.33333C13.3332 3.52178 13.2692 3.68022 13.1417 3.80867C13.0141 3.93711 12.8559 4.00089 12.667 4V12.6667C12.667 13.0333 12.5366 13.3473 12.2757 13.6087C12.0148 13.87 11.7008 14.0004 11.3337 14H4.66699ZM11.3337 4H4.66699V12.6667H11.3337V4ZM6.66699 11.3333C6.85588 11.3333 7.01433 11.2693 7.14233 11.1413C7.27033 11.0133 7.33411 10.8551 7.33366 10.6667V6C7.33366 5.81111 7.26966 5.65289 7.14166 5.52533C7.01366 5.39778 6.85544 5.33378 6.66699 5.33333C6.47855 5.33289 6.32033 5.39689 6.19233 5.52533C6.06433 5.65378 6.00033 5.812 6.00033 6V10.6667C6.00033 10.8556 6.06433 11.014 6.19233 11.142C6.32033 11.27 6.47855 11.3338 6.66699 11.3333ZM9.33366 11.3333C9.52255 11.3333 9.681 11.2693 9.809 11.1413C9.937 11.0133 10.0008 10.8551 10.0003 10.6667V6C10.0003 5.81111 9.93633 5.65289 9.80833 5.52533C9.68033 5.39778 9.52211 5.33378 9.33366 5.33333C9.14522 5.33289 8.98699 5.39689 8.85899 5.52533C8.73099 5.65378 8.66699 5.812 8.66699 6V10.6667C8.66699 10.8556 8.73099 11.014 8.85899 11.142C8.98699 11.27 9.14522 11.3338 9.33366 11.3333Z" fill="#EAEAEA"/>
              </svg>                
            </button>

            <button class="delete-permanent" ${isDeleted ? '' : 'hidden'}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.83325 17.5C5.37492 17.5 4.9827 17.3369 4.65659 17.0108C4.33048 16.6847 4.16714 16.2922 4.16659 15.8333V5C3.93048 5 3.7327 4.92 3.57325 4.76C3.41381 4.6 3.33381 4.40222 3.33325 4.16667C3.3327 3.93111 3.4127 3.73333 3.57325 3.57333C3.73381 3.41333 3.93159 3.33333 4.16659 3.33333H7.49992C7.49992 3.09722 7.57992 2.89944 7.73992 2.74C7.89992 2.58056 8.0977 2.50056 8.33325 2.5H11.6666C11.9027 2.5 12.1008 2.58 12.2608 2.74C12.4208 2.9 12.5005 3.09778 12.4999 3.33333H15.8333C16.0694 3.33333 16.2674 3.41333 16.4274 3.57333C16.5874 3.73333 16.6671 3.93111 16.6666 4.16667C16.666 4.40222 16.586 4.60028 16.4266 4.76083C16.2671 4.92139 16.0694 5.00111 15.8333 5V15.8333C15.8333 16.2917 15.6702 16.6842 15.3441 17.0108C15.018 17.3375 14.6255 17.5006 14.1666 17.5H5.83325ZM14.1666 5H5.83325V15.8333H14.1666V5ZM9.99992 11.5833L11.5833 13.1667C11.736 13.3194 11.9305 13.3958 12.1666 13.3958C12.4027 13.3958 12.5971 13.3194 12.7499 13.1667C12.9027 13.0139 12.9791 12.8194 12.9791 12.5833C12.9791 12.3472 12.9027 12.1528 12.7499 12L11.1666 10.4167L12.7499 8.83333C12.9027 8.68056 12.9791 8.48611 12.9791 8.25C12.9791 8.01389 12.9027 7.81944 12.7499 7.66667C12.5971 7.51389 12.4027 7.4375 12.1666 7.4375C11.9305 7.4375 11.736 7.51389 11.5833 7.66667L9.99992 9.25L8.41659 7.66667C8.26381 7.51389 8.06937 7.4375 7.83325 7.4375C7.59714 7.4375 7.4027 7.51389 7.24992 7.66667C7.09714 7.81944 7.02075 8.01389 7.02075 8.25C7.02075 8.48611 7.09714 8.68056 7.24992 8.83333L8.83325 10.4167L7.24992 12C7.09714 12.1528 7.02075 12.3472 7.02075 12.5833C7.02075 12.8194 7.09714 13.0139 7.24992 13.1667C7.4027 13.3194 7.59714 13.3958 7.83325 13.3958C8.06937 13.3958 8.26381 13.3194 8.41659 13.1667L9.99992 11.5833Z" fill="#EAEAEA"/>
              </svg>
            </button>
            <button class="restore" ${isDeleted ? '' : 'hidden'}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.8335 2.5C8.84437 2.5 6.93672 3.29018 5.53019 4.6967C4.12367 6.10322 3.3335 8.01088 3.3335 10H0.833496L4.07516 13.2417L4.1335 13.3583L7.50016 10H5.00016C5.00016 8.4529 5.61474 6.96917 6.70871 5.87521C7.80267 4.78125 9.2864 4.16667 10.8335 4.16667C12.3806 4.16667 13.8643 4.78125 14.9583 5.87521C16.0522 6.96917 16.6668 8.4529 16.6668 10C16.6668 11.5471 16.0522 13.0308 14.9583 14.1248C13.8643 15.2188 12.3806 15.8333 10.8335 15.8333C9.22516 15.8333 7.76683 15.175 6.71683 14.1167L5.5335 15.3C6.2265 16.0004 7.05211 16.5556 7.9621 16.9334C8.87209 17.3111 9.84823 17.5037 10.8335 17.5C12.8226 17.5 14.7303 16.7098 16.1368 15.3033C17.5433 13.8968 18.3335 11.9891 18.3335 10C18.3335 8.01088 17.5433 6.10322 16.1368 4.6967C14.7303 3.29018 12.8226 2.5 10.8335 2.5Z" fill="#EAEAEA"/>
              </svg>
            </button>

            <button class="unarchive-button" ${archived && !isDeleted ? '' : "hidden"}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 14.7292C10.2361 14.7292 10.4342 14.6492 10.5942 14.4892C10.7542 14.3292 10.8339 14.1314 10.8333 13.8958V11.2292L11.5833 11.9792C11.7361 12.132 11.9306 12.2083 12.1667 12.2083C12.4028 12.2083 12.5972 12.132 12.75 11.9792C12.9028 11.8264 12.9792 11.632 12.9792 11.3958C12.9792 11.1597 12.9028 10.9653 12.75 10.8125L10.5833 8.66667C10.4167 8.5 10.2222 8.41667 10 8.41667C9.77778 8.41667 9.58333 8.5 9.41667 8.66667L7.25 10.8125C7.09722 10.9653 7.02083 11.1597 7.02083 11.3958C7.02083 11.632 7.09722 11.8264 7.25 11.9792C7.40278 12.132 7.59722 12.2083 7.83333 12.2083C8.06944 12.2083 8.26389 12.132 8.41667 11.9792L9.16667 11.2292V13.8958C9.16667 14.1319 9.24667 14.33 9.40667 14.49C9.56667 14.65 9.76445 14.7297 10 14.7292ZM4.16667 6.66667V15.8333H15.8333V6.66667H4.16667ZM4.16667 17.5C3.70833 17.5 3.31611 17.337 2.99 17.0108C2.66389 16.6847 2.50056 16.2922 2.5 15.8333V5.4375C2.5 5.24306 2.53139 5.05556 2.59417 4.875C2.65694 4.69445 2.75056 4.52778 2.875 4.375L3.91667 3.10417C4.06944 2.90973 4.26028 2.76028 4.48917 2.65584C4.71806 2.55139 4.95778 2.49945 5.20833 2.5H14.7917C15.0417 2.5 15.2814 2.55223 15.5108 2.65667C15.7403 2.76112 15.9311 2.91028 16.0833 3.10417L17.125 4.375C17.25 4.52778 17.3439 4.69445 17.4067 4.875C17.4694 5.05556 17.5006 5.24306 17.5 5.4375V15.8333C17.5 16.2917 17.3369 16.6842 17.0108 17.0108C16.6847 17.3375 16.2922 17.5006 15.8333 17.5H4.16667ZM4.5 5H15.5L14.7917 4.16667H5.20833L4.5 5Z" fill="#EAEAEA"/>
              </svg>
            </button>
            <button class="archive-button" ${archived || isDeleted ? "hidden" : ''}>
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 6.66667C7.81111 6.66667 7.65289 6.73067 7.52533 6.85867C7.39778 6.98667 7.33378 7.14489 7.33333 7.33334V9.46667L6.73333 8.86667C6.61111 8.74445 6.45556 8.68334 6.26667 8.68334C6.07778 8.68334 5.92222 8.74445 5.8 8.86667C5.67778 8.98889 5.61667 9.14445 5.61667 9.33334C5.61667 9.52223 5.67778 9.67778 5.8 9.8L7.53333 11.5333C7.66667 11.6667 7.82222 11.7333 8 11.7333C8.17778 11.7333 8.33333 11.6667 8.46667 11.5333L10.2 9.8C10.3222 9.67778 10.3833 9.52223 10.3833 9.33334C10.3833 9.14445 10.3222 8.98889 10.2 8.86667C10.0778 8.74445 9.92222 8.68334 9.73333 8.68334C9.54445 8.68334 9.38889 8.74445 9.26667 8.86667L8.66667 9.46667V7.33334C8.66667 7.14445 8.60267 6.98623 8.47467 6.85867C8.34667 6.73112 8.18845 6.66712 8 6.66667ZM3.33333 5.33334V12.6667H12.6667V5.33334H3.33333ZM3.33333 14C2.96667 14 2.65289 13.8696 2.392 13.6087C2.13111 13.3478 2.00044 13.0338 2 12.6667V4.35C2 4.19445 2.02511 4.04445 2.07533 3.9C2.12556 3.75556 2.20044 3.62223 2.3 3.5L3.13333 2.48334C3.25556 2.32778 3.40822 2.20823 3.59133 2.12467C3.77444 2.04111 3.96622 1.99956 4.16667 2H11.8333C12.0333 2 12.2251 2.04178 12.4087 2.12534C12.5922 2.20889 12.7449 2.32823 12.8667 2.48334L13.7 3.5C13.8 3.62223 13.8751 3.75556 13.9253 3.9C13.9756 4.04445 14.0004 4.19445 14 4.35V12.6667C14 13.0333 13.8696 13.3473 13.6087 13.6087C13.3478 13.87 13.0338 14.0004 12.6667 14H3.33333ZM3.6 4H12.4L11.8333 3.33334H4.16667L3.6 4Z" fill="#EAEAEA"/>
              </svg>
            </button>
          </div>
        </div>
  `;

  // Stop event propagation to note action wrapper to prevent trigger notes event handler
  const noteActionWrapper = noteComponent.querySelector('.note-action-wrapper');
  noteActionWrapper.addEventListener('click', (e)=> {
    e.stopPropagation();
  })

  // Event handler button expand option menu
  const optionBtn = noteComponent.querySelector('.expand-option-button');
  optionBtn.addEventListener('click', function(){
    // ev.stopPropagation()
    
    // jika yg diklik sedang aktif tutup menu itu sendiri
    if(this.classList.contains('show')){
      this.classList.remove('show')
    }else {
      // jika yg diklik belum aktif, tutup semua menu
      const optionButtons = document.querySelectorAll('.expand-option-button');
      for (const optionBtn of optionButtons) {
        optionBtn.classList.remove('show')
      }

      // check apakah tombol aktif jika tidak, buka menu dari button yang di klik
      if(!this.classList.contains('show')){
        this.classList.add('show')
      }
    }

  })

  // event handler delete note button
  const deleteBtn = noteComponent.querySelector('.delete');
  deleteBtn.addEventListener('click', function(){
    moveToTrash(noteComponent.id)
    if(archived){
      dispatchRenderEvent('archive')
    } else {
      dispatchRenderEvent("notes")
    }
  })

  // event handler delete permanent
  const deletePermanentBtn = noteComponent.querySelector('.delete-permanent');
  deletePermanentBtn.addEventListener('click', function(){
    deletePermanent(id);
    dispatchRenderEvent('trash');
  })

  // restore handler
  const restoreBtn = noteComponent.querySelector('.restore');
  restoreBtn.addEventListener('click', function() {
    restore(id);
    dispatchRenderEvent('trash')
  })

  // event handler for archive note
  const archiveBtn = noteComponent.querySelector('.archive-button');
  archiveBtn.addEventListener('click', function(){
    archiveNote(id)
    dispatchRenderEvent("notes")
  })

  const unarchiveButton = noteComponent.querySelector('.unarchive-button');
  unarchiveButton.addEventListener('click', function(){
    unarchiveNote(id);
    dispatchRenderEvent("archive")
  })

  // event handler for update note
  const editBtn = noteComponent.querySelector('.edit');
  editBtn.addEventListener('click', function(){
    const modal = document.querySelector('.modal');
    const noteForm = document.getElementById('add-note-form');
    const titleInput = noteForm.querySelector('#title-input');
    const bodyInput = noteForm.querySelector('#note-body-input');
    const noteId = noteForm.querySelector('#note-id');

    modal.classList.add('show');
    noteForm.reset();
    titleInput.value = title;
    bodyInput.value = body
    noteId.value = id;

    document.getElementById('edit-note').removeAttribute('hidden')
    document.getElementById('add-note').setAttribute('hidden', '')
  })

  return noteComponent
}