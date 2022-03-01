### `Explanation of Solution`

This program, in the current state of writing the README takes in a text file, processes the letters and returns a list of the top 25 most commonly used words in the text. The definition I chose to use for a "root" word in my stemming algorithm was that a word is a "root" if it is used by 2 or more suffixes. For example, "DUN" is a root if both "DUNL" and "DUNEZ" are words in the text. All other words that contained the suffixes provided were considered a coincidence.

### `Time Spent`

I spent about 3/4 hours to get where I am now. With more time, I would have fully implemented the local storage feature and used that to display the PastResults component.

### `Libraries Used`

- Local Storage(not fully implemented)

### `npm install`

Installs all the required dependencies for the program

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
