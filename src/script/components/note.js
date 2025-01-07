export default function noteComponent({id, title, body, timestamp, color}){
  const noteComponent = document.createElement('div');
  
  const month = ['Jan', 'Feb', 'Mar', "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const d = new Date(timestamp);
  
  noteComponent.classList.add('note');
  noteComponent.classList.add(color);
  noteComponent.setAttribute('id', id);
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
            <button class="edit">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 14H14" stroke="#EAEAEA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.66699 11.3333V8.66667L11.3337 2L14.0003 4.66667L7.33366 11.3333H4.66699Z" stroke="#EAEAEA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.33301 4L11.9997 6.66667" stroke="#EAEAEA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="trash">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.66699 14C4.30033 14 3.98655 13.8696 3.72566 13.6087C3.46477 13.3478 3.33411 13.0338 3.33366 12.6667V4C3.14477 4 2.98655 3.936 2.85899 3.808C2.73144 3.68 2.66744 3.52178 2.66699 3.33333C2.66655 3.14489 2.73055 2.98667 2.85899 2.85867C2.98744 2.73067 3.14566 2.66667 3.33366 2.66667H6.00033C6.00033 2.47778 6.06433 2.31956 6.19233 2.192C6.32033 2.06444 6.47855 2.00044 6.66699 2H9.33366C9.52255 2 9.681 2.064 9.809 2.192C9.937 2.32 10.0008 2.47822 10.0003 2.66667H12.667C12.8559 2.66667 13.0143 2.73067 13.1423 2.85867C13.2703 2.98667 13.3341 3.14489 13.3337 3.33333C13.3332 3.52178 13.2692 3.68022 13.1417 3.80867C13.0141 3.93711 12.8559 4.00089 12.667 4V12.6667C12.667 13.0333 12.5366 13.3473 12.2757 13.6087C12.0148 13.87 11.7008 14.0004 11.3337 14H4.66699ZM11.3337 4H4.66699V12.6667H11.3337V4ZM6.66699 11.3333C6.85588 11.3333 7.01433 11.2693 7.14233 11.1413C7.27033 11.0133 7.33411 10.8551 7.33366 10.6667V6C7.33366 5.81111 7.26966 5.65289 7.14166 5.52533C7.01366 5.39778 6.85544 5.33378 6.66699 5.33333C6.47855 5.33289 6.32033 5.39689 6.19233 5.52533C6.06433 5.65378 6.00033 5.812 6.00033 6V10.6667C6.00033 10.8556 6.06433 11.014 6.19233 11.142C6.32033 11.27 6.47855 11.3338 6.66699 11.3333ZM9.33366 11.3333C9.52255 11.3333 9.681 11.2693 9.809 11.1413C9.937 11.0133 10.0008 10.8551 10.0003 10.6667V6C10.0003 5.81111 9.93633 5.65289 9.80833 5.52533C9.68033 5.39778 9.52211 5.33378 9.33366 5.33333C9.14522 5.33289 8.98699 5.39689 8.85899 5.52533C8.73099 5.65378 8.66699 5.812 8.66699 6V10.6667C8.66699 10.8556 8.73099 11.014 8.85899 11.142C8.98699 11.27 9.14522 11.3338 9.33366 11.3333Z" fill="#EAEAEA"/>
              </svg>                
            </button>
            <button class="archive">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 6.66667C7.81111 6.66667 7.65289 6.73067 7.52533 6.85867C7.39778 6.98667 7.33378 7.14489 7.33333 7.33334V9.46667L6.73333 8.86667C6.61111 8.74445 6.45556 8.68334 6.26667 8.68334C6.07778 8.68334 5.92222 8.74445 5.8 8.86667C5.67778 8.98889 5.61667 9.14445 5.61667 9.33334C5.61667 9.52223 5.67778 9.67778 5.8 9.8L7.53333 11.5333C7.66667 11.6667 7.82222 11.7333 8 11.7333C8.17778 11.7333 8.33333 11.6667 8.46667 11.5333L10.2 9.8C10.3222 9.67778 10.3833 9.52223 10.3833 9.33334C10.3833 9.14445 10.3222 8.98889 10.2 8.86667C10.0778 8.74445 9.92222 8.68334 9.73333 8.68334C9.54445 8.68334 9.38889 8.74445 9.26667 8.86667L8.66667 9.46667V7.33334C8.66667 7.14445 8.60267 6.98623 8.47467 6.85867C8.34667 6.73112 8.18845 6.66712 8 6.66667ZM3.33333 5.33334V12.6667H12.6667V5.33334H3.33333ZM3.33333 14C2.96667 14 2.65289 13.8696 2.392 13.6087C2.13111 13.3478 2.00044 13.0338 2 12.6667V4.35C2 4.19445 2.02511 4.04445 2.07533 3.9C2.12556 3.75556 2.20044 3.62223 2.3 3.5L3.13333 2.48334C3.25556 2.32778 3.40822 2.20823 3.59133 2.12467C3.77444 2.04111 3.96622 1.99956 4.16667 2H11.8333C12.0333 2 12.2251 2.04178 12.4087 2.12534C12.5922 2.20889 12.7449 2.32823 12.8667 2.48334L13.7 3.5C13.8 3.62223 13.8751 3.75556 13.9253 3.9C13.9756 4.04445 14.0004 4.19445 14 4.35V12.6667C14 13.0333 13.8696 13.3473 13.6087 13.6087C13.3478 13.87 13.0338 14.0004 12.6667 14H3.33333ZM3.6 4H12.4L11.8333 3.33334H4.16667L3.6 4Z" fill="#EAEAEA"/>
              </svg>
            </button>
          </div>
        </div>
  `

    const optionBtn = noteComponent.querySelector('.expand-option-button');
    optionBtn.addEventListener('click', function(){
      
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

  return noteComponent
}