 const SEARCH_API = 'https://www.googleapis.com/books/v1/volumes?q=';
 const API_KEY= process.env.API_KEY;
 const main = document.querySelector('.main');
 const search = document.getElementById('search-term');
 const form = document.querySelector('form');
 const authorRadio = document.getElementById('author');
 const titleRadio = document.getElementById('title');
 const readingListLink = document.querySelector('.nav-link');
 const bookSearch = document.querySelector('.logo');



async function fetchBook(url){
    const res = await fetch(url)
    const data = await res.json()
    showBooks(data.items)
}

form.addEventListener('submit', (e)=> {
  e.preventDefault()
  const searchTerm = search.value;
  let searchType = '';

  if (authorRadio.checked) {
    searchType = 'inauthor';
  } else if (titleRadio.checked) {
    searchType = 'intitle';
  }
  
  if (!searchTerm) {
    alert('Please enter something');
    return;
  }

  if(searchType){
    const url = SEARCH_API + searchType + ':' + searchTerm + '&startIndex=0&maxResults=20' + API_KEY;
    fetchBook(url);
    search.value = '';
  } else {
    window.location.reload()
  }
}) 

function showBooks(books, isReadingList){
  main.innerHTML = ''
  books.forEach((book) => {
    const { title, authors, description, imageLinks, previewLink } = book.volumeInfo;

    const imageSrc = imageLinks ? imageLinks.thumbnail : 'placeholder.jpg';
    const bookDescription = description || 'No description available';

    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    bookElement.innerHTML = `
        <img src="${imageSrc}" alt="Book Cover">
        <h2>${title}</h2>
        <p>${authors && authors.length > 0 ? 'Author' + (authors.length > 1 ? 's' : '') + ': ' + authors.join(', ') : 'Author: Unknown'}</p>
        <p class="description">${bookDescription}</p>
        ${isReadingList ? `<button class="read-book">Read Book</button>` : `<button class="add-to-reading-list">Add to Readling List</button>`}
    `;
    const imageElement = bookElement.querySelector('img');
    const descriptionElement = bookElement.querySelector('.description');

    imageElement.addEventListener('click', () => {
      descriptionElement.classList.toggle('show-description');
    });
   
   descriptionElement.addEventListener('click', () =>{
    descriptionElement.classList.toggle('show-description');
   })

    if (isReadingList) {
      const readBookButton = bookElement.querySelector('.read-book');
      readBookButton.addEventListener('click', () => {
        openBookPreview(previewLink);
      });
    } else {
      const addToReadingListButton = bookElement.querySelector('.add-to-reading-list');
      addToReadingListButton.addEventListener('click', () => {
        addToReadingList(book);
      });
    }

    main.appendChild(bookElement);
  
  });
}

function addToReadingList(book) {
  const readingList = JSON.parse(localStorage.getItem('readingList')) || [];
  
  // Check if the book is already in the reading list
  const existingBook = readingList.find((item) => item.id === book.id);
  if (existingBook) {
    alert('This book is already in the reading list.');
    return;
  }
  
  readingList.push(book);
  localStorage.setItem('readingList', JSON.stringify(readingList));
}


function displayReadingList() {
  const readingList = JSON.parse(localStorage.getItem('readingList')) || [];
  showBooks(readingList, true);
}

readingListLink.addEventListener('click', () => {
  displayReadingList();
});

function openBookPreview(previewLink) {
  window.open(previewLink, '_blank');
}

bookSearch.addEventListener('click', ()=>{
  window.location.reload()
})
