//MAIN BCAKEND FILE

const BookModel = require("./database/books"); //importimg dbbooks frm mongoDB Collections
// const AuthorModel = require("./database/authors"); -- hw
// const PublicationModel = require("./database/publications"); --hw

const express = require("express");

const app = express();
app.use(express.json());


const {MongoClient ,ServerApiVersion }  = require('mongodb');
const username = 'bhoo1504';
const password = 'ukchill06';
const clusterURL = 'cluster0.elxc8v6.mongodb.net';  
const dbName = 'book-company';

// // Import the mongoose module  
const mongoose = require('mongoose');
// // Set up default mongoose connection 
 const mongoDB = `mongodb+srv://${username}:${password}@${clusterURL}/${dbName}?retryWrites=true&w=majority`;
 mongoose.connect(mongoDB, {
    serverApi: {
      version: ServerApiVersion.v1, 
      strict: true,
      deprecationErrors: true  
    }
  } )
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((e) => {
      console.log('not connected');
    });


    
    /* const uri = `mongodb+srv://${username}:${password}@${clusterURL}/${dbName}?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1, 
      strict: true,
      deprecationErrors: true  
    }
  }); 

  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db(dbName).command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      const bcollection = await client.db(dbName).collection("books").findOne({ISBN:"12345Four"});
      console.log(bcollection);
} 
    finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir); */
 
  

//localhost:3000
app.get("/", (req, res) => {
    return res.json({"Welcome": `to my Backend Software for the book Company`});
});


//localhost:3000/books
app.get("/books", async (req,res) => {
    const getAllBooks = await BookModel.find()
;    console.log(getAllBooks);
    return res.json(getAllBooks); //or this also works: res.send("getALLBooks")
    
});


//localhost:3000/book-isbn/12345Four
app.get("/book-isbn/:isbn", async (req,res) => {
    // console.log(req.params);
    const isbn = req.params.isbn; //destructing
    // console.log(isbn);
    const getSpecificBook = await BookModel.findOne({ISBN: isbn});
    console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if(getSpecificBook===null) {
         return res.json({"error": `No Book found for the ISBN of ${isbn}`});
    }
     return res.json(getSpecificBook);  //refering a single book
});


//localhost:3000/book-category/programming
app.get("/book-category/:category", async (req,res) => {
    const {category} = req.params;  //destructing
    const booksInCategory = await BookModel.find({category:category});
    // console.log(booksInCategory);
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
app.post("/book", async (req,res) => {
    // console.log(req.body);
    const addNewBook = await BookModel.create(req.body);  //use mongoose model methods , mongoDB models doesn't work. create() works and insert() doesn't work
    return res.json({bookAdded: addNewBook,message: "Book was added !!!"});
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
app.put("/book-update/:isbn", async (req,res) => {
    // console.log(req.body);
    // console.log(req.params);
    const {isbn} = req.params;
    const updateBook = await BookModel.findOneAndUpdate({ISBN: isbn}, req.body, {new: true});  //use mongoose model methods , mongoDB models doesn't work. create() works and insert() doesn't work
    return res.json({bookUpdated: updateBook,message: "Book was updated !!!"});
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
    let {isbn,id} = req.params; //user requested
    id = Number(id); //data manipulate
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
    id = parseInt(id);
    db.authors.forEach((author) => {
        if(author.id === id) {
            // console.log({...author, ...req.body});
            if(!author.books.includes(isbn)) {
                return;
            }
            author.books = author.books.filter((book) => book!==isbn);
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