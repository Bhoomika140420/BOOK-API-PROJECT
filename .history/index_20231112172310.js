//MAIN BCAKEND FILE

const db = require("./database/index.js"); //import index of db 
// console.log(db.books);
// console.log(db.authors);
// console.log(db.publications);

const express = require("express");
const app = express();

//localhost:3000
app.get("/", (req,res) => {
    const getAllBooks = db.books;
    return res.json(getAllBooks); //or this also works: res.send("getALLBooks")
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
app.get("/book/category/:category", (req,res) => {
    const { isbn } = req.params;

    // Find the book with the specified ISBN
    const foundBook = books.find((book) => book.ISBN === isbn);

    if (!foundBook) {
        return res.status(404).json({ error: `No book found for ISBN ${isbn}` });
    }

    // Check if the category array contains "programming"
    const hasProgrammingCategory = foundBook.category.includes("programming");

    res.json({
        book: foundBook,
        hasProgrammingCategory: hasProgrammingCategory,
    });


});

app.listen(3000, () => {
    console.log("our First Express is running at localhost:3000");
});