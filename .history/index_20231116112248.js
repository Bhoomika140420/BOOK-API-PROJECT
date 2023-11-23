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
    const {isbn} =  req.params;
    console.log(isbn);
    const getSpecificAuthor = db.authors.filter((author) => author.books.includes(isbn));
    if (getSpecificAuthor.length===0) {
        return  res.json({ "error": `No Author found for the isbn of ${isbn}`});
      }
      return res.json(getSpecificAuthor);
    }
);

//localhost:3000/publications
app.get("/publications", (req,res) => {
    const getAllPublications = db.publications;
    return res.json(getAllPublications)
});

//localhost:3000/publication-isbn/12345Two --hw
app.get("/publication-isbn/:isbn", (req,res) => {
    const {isbn} =  req.params;
    console.log(isbn);
    const getSpecificPublication = db.publications.filter((publication) => publication.books.includes(isbn));
    if (getSpecificPublication.length===0) {
        return  res.json({ "error": `No Publication found for the isbn of ${isbn}`});
      }
      return res.json(getSpecificPublication);
    
});

//localhost:3000/book  (NOte:adding one book,so singular)
app.post("/book", (req,res) => {
    console.log(req.body);
    db.books.push(req.body);
    return res.json(db.books);  
});

//localhost:3000/author
app.post("/author", (req,res) => {
    console.log(req.body);
    db.authors.push(req.body);
    return res.json(db.authors);  
});

//localhost:3000/publication
app.post("/publication", (req,res) => {
    console.log(req.body);
    db.publications.push(req.body);
    return res.json(db.publications);  
});

//localhost:3000/book-update/12345One
app.put("/book-update/:isbn", (req,res) => {
    console.log(req.body);
    console.log(req.params);
    const {isbn} = req.params;
    db.books.forEach((book) => {
        if(book.ISBN === isbn){
           console.log({...book, ...req.body}); 
           return {...book, ...req.body} //spread operator
        }
    return book;
    })
    return res.json(db.books);  
});

//localhost:3000/author-update/1
app.put("/author-update/:id", (req,res) => {
    console.log(req.body);
    console.log(req.params);
    const {id} = req.params;
    db.authors.forEach((author) => {
        if(author.id === id){
           console.log({...author, ...req.body}); 
           return {...author, ...req.body} //spread operator
        }
    return author;
    })
    return res.json(db.authors);  
});

//localhost:3000/publication-update/1
app.put("/publication-update/:id", (req,res) => {
    console.log(req.body);
    console.log(req.params);
    const {id} = req.params;
    db.publications.forEach((publication) => {
        if(publication.id === id){
           console.log({...publication, ...req.body}); 
           return {...publication, ...req.body} //spread operator
        }
    return publication;
    })
    return res.json(db.publications);  
});

//localhost:3000/book-delete/12345One
app.delete("/book-delete/:isbn", (req,res) => {
    console.log(req.params);
    const {isbn} = req.params;
    const filteredBooks = db.books.filter((book) => book.ISBN!==isbn);
    console.log(filteredBooks);
    db.books = filteredBooks;
    return res.json(db.books);  
});

//localhost:3000/book-author-delete/12345One/1
app.delete("/book-author-delete/:isbn/:id", (req,res) => {
    console.log(req.params);
    let {isbn,id} = req.params;
    id = Number(id);
    db.books.forEach((book) => {
        if(book.ISBN === isbn){
           console.log({...book, ...req.body}); 
           if(!book.authors.includes(id)) {
            return res.json(`author not found of ${id}`);
           }
           book.authors = book.authors.filter((author) => author!==id);
           return book;
        }
        return book;
    });
    return res.json(db.books);
});


//localhost:3000/author-book-delete/1/12345One --hw
app.delete("/author-book-delete/:id/:isbn", (req,res) => {
    console.log(req.params);
    let {isbn,id} =  req.params;
    // id = parseInt(id);
    db.authors.forEach((author) => {
        if(author.id === id) {
            console.log({...author, ...req.body});
            if(!author.books.includes(isbn)) {
                return;
            }
            author.books = author.books.filter((book) => book.ISBN!==isbn);
            console.log(author.books);
            return author;
        }
        return author;
    })
    return res.json(db.authors);
});

//localhost:3000/author-delete/1 --hw
app.delete("/author-delete/:id", (req,res) => {
    console.log(req.params);
    const {id} = req.params;
    const authorId = parseInt(id);
    const filteredAuthors = db.authors.filter((author) => author.id!==authorId);
    // console.log(filteredAuthors);
    db.authors = filteredAuthors;
    return res.json(db.authors);
    
});


//localhost:3000/publication-delete/1 --hw
app.delete("/publication-delete/:id", (req,res) => {
    console.log(req.params);
    const {id} = req.params;
    const authorId = parseInt(id);
    const filteredPublications = db.publications.filter((publication) => publication.id!==authorId);
    // console.log(filteredPublications);
    db.publications = filteredPublications;
    return res.json(db.publications);
});


app.listen(3000, () => {
    console.log("our First Express is running at localhost:3000");
});