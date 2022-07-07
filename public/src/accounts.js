
function findAccountById(accounts, id) {
  //find the account object where the id matches the given id as a param
  return accounts.find(account => account.id === id)
}

function sortAccountsByLastName(accounts) {
  //sort the accounts array in alphabetical order by last name
  return accounts.sort((a,b) => {
    const nameA = a.name.last.toLowerCase()
    const nameB = b.name.last.toLowerCase()
    return nameA < nameB ? -1 : 1
  })
}

/*
The `getTotalNumberOfBorrows()` function in `public/src/accounts.js` has two parameters, in the following order:

Input: An account object.
- example:

const account = 
    {
      "id": "5f446f2ecfaf0310387c9603",
      "name": {
        "first": "Esther",
        "last": "Tucker"
      },
      "picture": "https://api.adorable.io/avatars/75/esther.tucker@zillacon.me",
      "age": 25,
      "company": "ZILLACON",
      "email": "esther.tucker@zillacon.me",
      "registered": "Thursday, May 28, 2015 2:51 PM"
    }
Input: An array of all book objects.
- example:
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
  }
]

Output: integer
- example: 10

number of times the account's ID appears in any book's `borrows` array
we need a variable to increment
 -  let numBorrows = 0

 loop through book to get borrows, then loops through borrows to get id
and check where the account id matches the id in the borrow objects
 - condition: account.id === borrower.id

 - let numBorrows = 0
   return books.forEach(book => book.borrows.forEach(borrower => account.id === borrower.id))

everytime the id in the borrows object matches, increment the counter
 - if(account.id === borrower.id){
   numBorrows++
  }
or use ternary
 - ? numBorrows++ : numBorrows

 - let numBorrows = 0
   return books.forEach(book => book.borrows.forEach(borrower => account.id === borrower.id ? numBorrows++ : numBorrows))
It returns a _number_ that represents the number of times the account's ID appears in any book's `borrows` array.

*/          
function getTotalNumberOfBorrows({id:userId}, books) {
  let numBorrows = 0
  books.forEach(book => book.borrows.forEach(borrower => 
    userId === borrower.id ? numBorrows++ : numBorrows))
    return numBorrows
  }

/* 
#### getBooksPossessedByAccount()

The `getBooksPossessedByAccount` function in `public/src/accounts.js` has three parameters, in the following order:

Input: An account object.
- example:

const account = 
    {
      "id": "5f446f2ecfaf0310387c9603",
      "name": {
        "first": "Esther",
        "last": "Tucker"
      },
      "picture": "https://api.adorable.io/avatars/75/esther.tucker@zillacon.me",
      "age": 25,
      "company": "ZILLACON",
      "email": "esther.tucker@zillacon.me",
      "registered": "Thursday, May 28, 2015 2:51 PM"
    }

Input: An array of all book objects.
- example:
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
  }
]

-Input: array of objects
 -example:
 const authors = 
 [
  {
    "id": 0,
    "name": {
      "first": "Lucia",
      "last": "Moreno"
    }
  },
  ...
 ]
  
Output: array of objects 
 -example:
  [
    {
      id: "5f447132320b4bc16f950076",
      title: "est voluptate nisi",
      genre: "Classics",
      authorId: 12,
      author: {
        id: 12,
        name: {
          first: "Chrystal",
          last: "Lester",
        },
      },
      borrows: [
        {
          id: "5f446f2e6059326d9feb9a68",
          returned: false,
        },
        ...
      ],
    },
  ]

It returns an array of book objects, including author information, that represents all books 
_currently checked out_ by the given account.
- condition: book.borrows.id === account.id
pull out book object and add key of 'author' with value of author object
check if book is not currently checked out
 - condition: !book.borrows[0].returned
 - const bookObjs = books.filter(book => book.borrows.id === account.id && !book.borrows[0].returned)
match the book id to author id in the author array using find
 - condition: author.id === books.authorId
create a variable to store the author object, with the id that matches the authorId in the book object
 -const authObj = authors.find(author => author.id === books.find(book => book.authorId) )
use map on bookObjs to add key and value to the book objects
 - bookObjs.map(book => book['authors'] = authObj)
add the author key and value as the object in the author
- book['author'] = authObj
final array should include book objects which have the 'author' key and the object of the author

const bookObjs = books.filter(book => book.borrows.id === account.id && !book.borrows[0].returned)
bookObjs.map(book => book["author"]= authors.find(author => author.id === books.find(book => book.authorId))
return bookObjs
*/

function getBooksPossessedByAccount(account, books, authors) {
  const bookObjs = books.filter(book => book.borrows[0].id === account.id && !book.borrows[0].returned)
  bookObjs.map(book => book["author"] = authors.find(author => author.id === book.authorId))
  return bookObjs
}

// function getBooksPossessedByAccount(account, books, authors) {
//   const bookObjs = books.filter(book => book.borrows[0].id === account.id && !book.borrows[0].returned)
//   .map(book => let author = authors.find(author => author.id === book.authorId))
//   return {...book, author}
// }

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
