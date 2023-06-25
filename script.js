 const SEARCH_API = 'https://www.googleapis.com/books/v1/volumes?q=';
 const main = document.querySelector('.main');
 const search = document.getElementById('search-term');
 const form = document.querySelector('form');
 const authorRadio = document.getElementById('author');
 const titleRadio = document.getElementById('title');
 const readingListLink = document.querySelector('.nav-link');
 const bookSearch = document.querySelector('.logo');

 function fetchBook(url) {
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if(data.totalItem === 0){
        showNoResultsFound();
      } else {
        showBooks(data.items);
      }
    })
  }

form.addEventListener('submit', async(e)=> {
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

  if (searchType) {
    const url = SEARCH_API + searchType + ':' + searchTerm + '&startIndex=0&maxResults=20' + API_KEY;
    fetchBook(url);
    // search.value = '';
  } else {
    window.location.reload()
  }
});


function showNoResultsFound(){
  main.innerHTML = '<div class="no-results">Sorry, no results found</div>'
  search.value = ' ';
}

function showBooks(books, isReadingList){
  if(!books || books.length === 0){
    showNoResultsFound();
    return;
  }
  main.innerHTML = ''


  if(!isReadingList){
    const totalBookDescription = document.createElement('div');
    const searchTerm = search.value;
    totalBookDescription.classList.add('totalbook');
    totalBookDescription.innerHTML = `Search results for ${searchTerm}`;
    search.value = ' ';
  
    main.appendChild(totalBookDescription);
  }


  const booksContainer = document.createElement('div');
  booksContainer.classList.add('books-container');
  
  books.forEach((book) => {
    const { title, authors, description, imageLinks, previewLink } = book.volumeInfo;

    const imageSrc = imageLinks ? imageLinks.thumbnail : 'placeholder.jpg';
    const bookDescription = description || 'No description available';

    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    bookElement.innerHTML = `
        <img src="${imageSrc}" alt="Book Cover">
        <h2>${title}</h2>
        <p>Author : ${authors}</p>
        <p class="description">${bookDescription}</p>
        ${
          isReadingList 
          ? `<button class="read-book">Read Book</button>
             <button class="remove-from-reading-list"><i class="fa-solid fa-xmark"></i></button>`
          : `<button class="add-to-reading-list">Add to Readling List</button>`
      }
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
      const removeFromReadingListButton = bookElement.querySelector('.remove-from-reading-list');
      removeFromReadingListButton.addEventListener('click', () => {
        const confirmDelete = confirm('Are you sure you want to remove this book from your reading list?');
        if (confirmDelete) {
          removeBookFromReadingList(book);
          bookElement.remove(); // Remove the book element from the DOM
        }
      });
    
    } else {
      const addToReadingListButton = bookElement.querySelector('.add-to-reading-list');
      addToReadingListButton.addEventListener('click', () => {
        addToReadingList(book);
      alert('Success, book added to reading list');
      });
    }
    booksContainer.appendChild(bookElement);
  });
  main.appendChild(booksContainer);
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

function removeBookFromReadingList(book) {
  const readingList = JSON.parse(localStorage.getItem('readingList')) || [];

  // Find the index of the book in the reading list
  const index = readingList.findIndex((item) => item.id === book.id);

  // If the book is found in the reading list, remove it
  if (index !== -1) {
    readingList.splice(index, 1);
    localStorage.setItem('readingList', JSON.stringify(readingList));
  }
}