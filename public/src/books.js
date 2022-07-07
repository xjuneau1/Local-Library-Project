//Input:array, integer(number)
//Output: object

//return the object of the author that matches the id
//all authors have a different ID, so we don't need to go through them all
//just find the one that matches
//- use .find() to return object that matches the condition
//- condition: authors.id === id

function findAuthorById(authors, id) {
  return authors.find(author => author.id === id)
}


//Input:array, string
//Output: object

//return the object of the book that matches the id
//all books have a different ID, so we don't need to go through them all using .filter()
//just find the one that matches
//- use .find() to return object that matches the condition
//- condition: books.id === id
function findBookById(books, id) {
  return books.find(book => book.id === id)
}


/*
It returns an array with two arrays inside of it. All of the inputted 
books are present in either the first or second array.

Input: array
Output: 2D array
  -example:
      [
        [firstArray],
        [secondArray]
      ]

Since our output is two arrays coming from one array, we will have to filter 
out or find the information given the conditions

1. The first array contains book objects that represent the books that are 
currently checked out.
  -condition: books.borrows[0].returned === false
Use .filter() to return an array of the objects that meet the above condition
  -books.filter(book=> book.borrows)
We can use some() because if just one value of the returned key is false, the book
has not been returned.
.some() will loop through the objects so we don't need to reference the index as in 
the first condition.
  -book.borrows.some(borrow => borrow.returned === false)
 or
  -book.borrows.some(borrow => !borrow.returned)


2. the second array contains book objects that represent the books 
that have been returned
  -condition: books.borrows[0].returned === true
Use .filter() again to return an array of the objects that meet the above condition
  -books.filter(book=> book.borrows)
We can then use every() because if ALL of the values of the returned key are true, the 
book has been returned.
.every() will loop through the objects and check if the condition is met for ALL
  -book.borrows.every(borrow=> borrow.returned === true)
 or
  -book.borrows.every(borrow=> borrow.returned)

The filter method in each, returns the array given the condition inside of the .some() and
.every() methods respectively
We can store these statements as variables and construct an array with both variables
 - return finalArray = [borrowedArray, returnedArray]
*/

function partitionBooksByBorrowedStatus(books) {
  // const borrowedArray = books.filter(book => book.borrows.some(borrow => 
  // !borrow.returned))
  // const returnedArray = books.filter(book => book.borrows.every(borrow => 
  // borrow.returned))
  // return finalArray = [borrowedArray, returnedArray]


  /*We can initialize a variable as an empty 2D array
   - const finalArray = [[],[]] ; where the arrays in the array can be referenced by [index]
   either [0] or [1] being the first and second arrays in finalArray
  
   We want to execute some code on every object in the given array
  use forEach() to execute code on every object (every index)
   - books.forEach()

  we want to check the value of the returned key of the index[0] in 'borrows' and do 
  something if it is true or false
   - books.forEach(book=> book.borrows[0].returned)

  We can use ternary (? true:false) to provide code that will execute if true 
  or false is returned.

  if true, we want to push the current object(book) into the array at index 1;
  the second array in the finalArray
   -condition: ? array[1].push(book): false

  if false we want to push the current object(book) into the array at index 0
   -condition: ? true: array[0].push(book)
 */

  const finalArray = [[], []]
  books.forEach(book => !book.borrows[0].returned ? finalArray[0].push(book) : finalArray[1].push(book))
  return finalArray

}

/*
return an array of ten or fewer account objects
that represents the accounts given by the IDs in the provided book's `borrows` array. 
However, each account object should 
include the `returned` entry from the corresponding transaction object in the `borrows` array.
*/

function getBorrowersForBook(book, accounts) {
  //use map to return an array with the account objects where the account id matches the borrows id
  return book.borrows.map(borrow => {
    //use find to check the condition and get the object
    const account = accounts.find(account => account.id === borrow.id)
    // return the object with all the borrow objects and account objects
    return {...borrow, ...account}
  }).slice(0, 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
