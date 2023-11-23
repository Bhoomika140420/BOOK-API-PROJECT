//MAIN BCAKEND FILE

const db = require("./database/index.js"); //import index of db 
// console.log(db.books);
// console.log(db.authors);
// console.log(db.publications);

const express = require("express");
const app = express();
app.use(express.json());

//localhost:3000
app.get("/", (req, res) => {
    return res.json({"Welcome": `to my Backend Software for the book Company`});
});


//localhost:3000/books
app.get("/books", (req,res) => {
    const getAllBooks = db.books;
    return res.json(getAllBooks);         //or this also works: res.send("getALLBooks")
});


//localhost:3000/book/isbn/
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
     return res.json(getSpecificBook[0]);  //refering a single book
});


//localhost:3000/book-category/programming
app.get("/book-category/:category", (req,res) => {
    const {category} = req.params;  //destructing
    const booksInCategory = db.books.filter((book) => book.category.includes(category));
    if (booksInCategory.length===0) {
        return res.json({ "error": `No books in that category of ${category}` });
    }
    return res.json(booksInCategory);
   
});

//localhost:3000/authors
app.get("/authors", (req,res) => {
    const authorsList = db.authors;
    return res.json(authorsList)
});

//localhost:3000/author-id/1 or 2
app.get("/author-id/:id", (req,res) => {
    let {id} = req.params;  //destructing
    id = Number(id); // cuz the number is coberting to string and throwin' err, so keeping it as number datatype 
    console.log(id);
    const getSpecificAuthor = db.authors.filter((author) => author.id === id);
    if (getSpecificAuthor.length===0) {
      return  res.json({ "error": `No Author found for the id of ${id}`});
    }
    return res.json(getSpecificAuthor[0]);
   
});

//localhost:3000/author-isbn/12345One --hw
app.get("/author-isbn/:isbn", (req,res) => {
   
});

//localhost:3000/publications
app.get("/publications", (req,res) => {
    const getAllPublications = db.publications;
    return res.json(getAllPublications)
});

//localhost:3000/publication-isbn/12345Two --hw
app.get("/publication-isbn/:isbn", (req,res) => {
   
});

//localhost:3000/book  (NOte:adding one book,so singular)
app.post("/book", (req,res) => {
    console.log(req.body);
    db.books.push(req.body);
    return res.json(db.books);  
});

app.listen(3000, () => {
    console.log("our First Express is running at localhost:3000");
});