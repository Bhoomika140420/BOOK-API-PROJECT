//MAIN BCAKEND FILE

const db = require("./database/index.js"); //import index of db 
// console.log(db.books);
// console.log(db.authors);
// console.log(db.publications);

const express = require("express");
const app = express();

//localhost:3000
app.get("/", (req, res) => {
    return res.json({"Welcome": `to my Backend Software for the book Company`});
});


//localhost:3000/books
app.get("/books", (req,res) => {
    const getAllBooks = db.books;
    return res.json(getAllBooks);         //or this also works: res.send("getALLBooks")
});


//localhost:3000/book/isbn
app.get("/book/:isbn", (req,res) => {
    // console.log(req.params);
    const isbn = req.params.isbn; //destructing
    // console.log(isbn);
    const getSpecificBook = db.books.filter((book) => book.ISBN === isbn);
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if(getSpecificBook.length===0) {
         res.send({"error": `No Book found for the ISBN of ${isbn}`});
    }
     res.send(getSpecificBook[0]);  //refering a single book
});


//localhost:3000/book-category/programming
app.get("/book-category/:category", (req,res) => {
    const { category } = req.params;  //destructing
    const booksInCategory = db.books.filter((book) => book.category.includes(category));
    if (booksInCategory.length === 0) {
        res.send({ "error": `No books in that category of ${category}` });
    }
    res.send(booksInCategory);
   
});

//localhost:3000/authors
app.get("/authors", (req,res) => {
    const authorsList = db.authors;
    return res.json(authorsList)
});


//localhost:3000/book-category/author
app.get("/author/:id", (req,res) => {
    const { id } = req.params;  //destructing
    const getSpecificAuthor = db.authors.filter((author) => author.id === id);
    if (getSpecificAuthor.length === 0) {
        res.send({ "error": `No Author found for the id ${id}`});
    }
    return res.json(getSpecificAuthor[0]);
   
});


app.listen(3000, () => {
    console.log("our First Express is running at localhost:3000");
});