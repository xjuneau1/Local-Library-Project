function getTotalBooksCount(books) {
  //total books is just the length of the books array
  return books.length;
}

function getTotalAccountsCount(accounts) {
  //total accounts is just the length of the account array.
  return accounts.length;
}


/*
### getBooksBorrowedCount()

Input: array
Output: integer

return a number that represents the number of books that are currently checked out
This number can be initialized as a variable and incremented when the condition is met
We then return that variable at the end
 - let borrowedCount = 0
This number can be found by looking at the first transaction object in 
the `borrows` array of each book. 
-condition: books.forEach(book => book.borrows[0].returned)
If the transaction says the book has not been returned 
(i.e. `returned: false`), the book is currently being borrowed.

use ternary to execute code given true or false return
if the book.borrows[0].returned value is false we want to increment the borrowedCount
- ? true : borrowedCount++
if the book.borrows[0].returned value is true we don't want to add anything
- ? borrowedCount + 0: false
lastly return borrowedCount
*/

function getBooksBorrowedCount(books) {
  let borrowedCount = 0;
  books.forEach((book) =>
    book.borrows[0].returned ? borrowedCount : borrowedCount++
  );
  return borrowedCount;
}


/*
### getMostCommonGenres()

getMostCommonGenres() has a single parameter 'books'
returns an array containing five objects or fewer that represents the most common occurring genres, 
ordered from most common to least.
 

Input: 2D array
    -example:

const books = 
    [
      {
        "id": "5f4471327864ee880caf5afc",
        "title": "reprehenderit quis laboris adipisicing et",
        "genre": "Poetry",
        "authorId": 20,
        "borrows": [
          {
            "id": "5f446f2e2a4fcd687493a775",
            "returned": false
          },
          {
            "id": "5f446f2ebe8314bcec531cc5",
            "returned": true
          },
          {
            "id": "5f446f2ea508b6a99c3e42c6",
            "returned": true
          }
        ]
      },
      ...
    ]
Output: 2D array
    -example:
    [
      {name: "Nonfiction", count: 9 },
      {name: "Historical Fiction", count: 7},
      {name: "Science", count: 4},
      ...    
    ]

The objects should contain a key called 'name' with the value of 
the genre value in the book 
and another key called 'count' with the value of how many times the genre 
occurs in the books array.

If the book genre doesn't exist create a new obj with the key-values

 -if (!acc[name]){
  acc.push(
    {name: book.genre, count: 1}
  )
 }
 If the genre already exists, increment the counter on that object
 -if (!acc[name]){
  acc.push(
    {name: book.genre, count: 1}
  )
 }
 if(acc[name]){
  acc.count++
 }
Use reduce to create an object with name as the first 
key and its value as the genre value in the book
 -let counter = 0
 return books.reduce((acc, book)=> {
  if (!acc[name]){
  acc[name] = book.genre
  acc[count] = counter++
 } else {
  acc[count] = counter++
}
 return acc
 },{})
the key and the genre as the value ordered from most common to least.
 - .sort((a,b)=> a.count > b.count ? -1 : 1)
the array should contain five objects or fewer
 - .slice(0,5)


 -let counter = 0
 return books.reduce((acc, book)=> {
  if (!acc[name]){
  acc[name] = book.genre
  acc[count] = counter++
 } else {
  acc[count] = counter++
}
 return acc
 },{}).slice(0,5)

Each object in the returned array has two keys:

- The `name` key which represents the name of the genre.
- The `count` key which represents the number of times the genre occurs.

Even if there is a tie, the array should only contain no more than five objects.
*/


function getMostCommonGenres(books) {
  
  return books
    .reduce((acc, book) => {
      const genreFound = acc.find(accum => accum.name === book.genre)
      if (!genreFound) {
        acc.push(
          {name: book.genre, count: 1}
        )
      } else {
        genreFound.count++
      }
      return acc;
    }, [])
    .sort((a,b)=> a.count > b.count ? -1 : 1)
    .slice(0, 5)
}

/*
### getMostPopularBooks()

The `getMostPopularBooks()` function in `public/src/home.js` has a single parameter:

Input: array
  -example:
      []


Output: array with at most five objects
Each object in the returned array has two keys
The `name` key which represents the title of the book.
The `count` key which represents the number of times the book has been borrowed.
  -example:
      [
        {name: 'book title', count: '# of times borrowed'},
        {},
        {},
        {},
        {}
      ]


objects represent the most popular books in the library 
Popularity is represented by the number of times a book has been borrowed
 -count: books[borrows].length

Use .map() to create an array with a new object from key-values in books
 - books.map(book=> ({name: book.title, count: book.borrows.length}))
store that array in a variable, sort and slice it
.sort((a,b) => a.count > b.count ? -1: 1)
.slice(0,5)
Even if there is a tie, the array should only contain no more than five objects.
*/
function _sortByPopularity(unsortedArr){
  return unsortedArr.sort((firstObj, secondObj) => firstObj.count > secondObj.count ? -1 : 1)
}


function getMostPopularBooks(books) {
  //use map to return an array of objects with the book title and how many times it has been borrowed
  const popular = books.map(book =>({name: book.title, count: book.borrows.length}))
  //use helper function to sort array, chain .slice() to get just 5 objects
  return _sortByPopularity(popular).slice(0,5)
}


/*
### getMostPopularAuthors()

The `getMostPopularAuthors()` function in `public/src/home.js` has two parameters, in the following order:
Input: array of book objects.
  -example: 
  const books = 
    [
      {
        "id": "5f4471327864ee880caf5afc",
        "title": "reprehenderit quis laboris adipisicing et",
        "genre": "Poetry",
        "authorId": 20,
        "borrows": [
          {
            "id": "5f446f2e2a4fcd687493a775",
            "returned": false
          },
          {
            "id": "5f446f2ebe8314bcec531cc5",
            "returned": true
          },
          {
            "id": "5f446f2ea508b6a99c3e42c6",
            "returned": true
          }
        ]
      },
      ...
    ]

Input: array of author objects.
  -example:
  const authors =[
    {
      "id": 0,
      "name": {
        "first": "Lucia",
        "last": "Moreno"
      }
    },
    {
      "id": 1,
      "name": {
        "first": "John",
        "last": "Moritz"
      }
    },
  ]

Output: an array of objects
 - example:
 [
  {name: Lucia Moreno, count: 5},
  {name: John Moritz, count: 3},
  {name: Larry Sanchez, count: 2},
 ]

It returns an array containing five objects or fewer 
 - let finalArray = []
 represents the most popular authors whose books have been checked out the most.
Each object in the returned array has two keys:
The `name` key is the first and last name of the author.
The `count` key is the number of times the author's books have been borrowed.
 - {name:`${author.name.first} ${author.name.last}`, count: 0}
The number of times the book has been borrowed is the same as the length of the 
borrows array
 - book.borrows.length
Popularity is represented by finding all of the books written by the author and 
then adding up the number of times those books have been borrowed.
 - acc += book.borrows.length
Make a variable to store the array using .filter() through the books array to get 
all book objects where the authorId is the same as the id in the authors array
 - condition: books.authorID === authors.id
 - const authBooks = books.filter(book => books.authorId === authors.id)
Use .reduce() to get the total number of borrows for ALL books by author
 -let authBooksCount = books.filter(book => books.authorId === authors.id)
    .reduce((acc, book) => {
      acc += book.borrows.length
      return acc
    },0)
Use .reduce() once more to create an array and push in an object with the author name
and authBooksCount
 -
Even if there is a tie, the array should contain no more than five objects.
 - .slice(0,5)
*/
function getMostPopularAuthors(books, authors) {
  const popularAuthors = authors.map(author => {
    const booksBy = books.filter(book => book.authorId === author.id);
    const borrows = booksBy.reduce((acc, book) => acc + book.borrows.length, 0);
    const authorInfo = {
      name: `${author.name.first} ${author.name.last}`,
      count: borrows
    };
    return authorInfo;
  })
  _sortByPopularity(popularAuthors).splice(5)
  return popularAuthors
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
