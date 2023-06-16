 A book search app using Google Book Api
 
 To protect the API KEY, the key is stored in a seperate key.js file, and then I included <script src="key.js"></script> before <script src="script.js" defer></script> in my HTML file to ensure that the API key is loaded before my main script. This way, script.js can access the API_KEY variable defined in key.js. I added key.js to my .gitignore file. By doing this,  instructed Git to ignore changes to this file, preventing it from being committed to the repository.
 
Here is a breakdown on how the application works:

Fetching Books from the API:
To fetch books from the Google Books API, I define a fetchBook function that takes a URL as a parameter. Inside this function, I use the fetch API to make a GET request to the specified URL. I then parse the response as JSON using res.json() and pass the resulting data to the showBooks function.

Searching for Books:
When the user submits the search form, the submit event listener triggers the fetchBook function. It first prevents the default form submission behavior. Then, it retrieves the search term and determines the search type based on the selected radio button (author or title). It constructs the API URL with the search term and search type, appends the API key, and calls the fetchBook function.

Displaying Books:
The showBooks function takes two parameters, which are an array of books and a a boolean isReadingList indicating whether it's the reading list view. It iterates over each book and extracts relevant information such as title, authors, description, and thumbnail image links. Using this information, it dynamically creates HTML elements and appends them to the main container.

Adding Books to the Reading List:
When a user clicks the "Add to Reading List" button, the addToReadingList function is called. It first retrieves the existing reading list from the local storage or initializes an empty array. Then, it checks if the book is already in the reading list by searching for a book with the same ID. If found, an alert is displayed, and the function returns. If the book is not in the reading list, it is added to the array, and the updated reading list is stored back in the local storage.

Viewing the Reading List:
Clicking the reading list navigation link triggers the displayReadingList function. This function retrieves the reading list from the local storage and passes it to the showBooks function with isReadingList set to true. This allows the showBooks function to render the books with a different button.

Opening Book Previews:
Clicking the "Read Book" button for a book in the reading list triggers the openBookPreview function, which opens the preview link of the book in a new tab using window.open.

