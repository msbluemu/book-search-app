 A book search app using Google Book Api
 
 To protect the API KEY, the key is stored in a seperate key.js file, and then I included <script src="key.js"></script> before <script src="script.js" defer></script> in my HTML file to ensure that the API key is loaded before my main script. This way, script.js can access the API_KEY variable defined in key.js. I added key.js to my .gitignore file. By doing this,  instructed Git to ignore changes to this file, preventing it from being committed to the repository.
 
