//MAIN BCAKEND FILE

const BookModel = require("./database/books"); //importimg dbbooks frm mongoDB Collections
const AuthorModel = require("./database/authors"); 
const PublicationModel = require("./database/publications"); 

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
;   console.log(getAllBooks);
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
app.get("/authors", async (req,res) => {
    const getAuthorsList =  await AuthorModel.find();
    console.log(getAuthorsList);
    return res.json(getAuthorsList);
});

//localhost:3000/author-id/1 or 2
app.get("/author-id/:id", async (req,res) => {
    let {id} = req.params;  //destructing
    id = Number(id); // cuz the number is coberting to string and throwin' err, so keeping it as number datatype 
    console.log(id);
    const getSpecificAuthor = await AuthorModel.findOne({id});
    console.log(getSpecificAuthor);
    if (getSpecificAuthor===null) {
      return  res.json({ "error": `No Author found for the id of ${id}`});
    }
    return res.json(getSpecificAuthor);
   
});

//localhost:3000/author-isbn/12345One --hw
app.get("/author-isbn/:isbn", async (req,res) => {
    const {isbn} =  req.params;
    console.log(isbn);
    const getSpecificAuthor = await PublicationModel.findOne({books: isbn});
    if (getSpecificAuthor===null) {
        return  res.json({ "error": `No Author found for the isbn of ${isbn}`});
      }
      return res.json(getSpecificAuthor);
    }
);

//localhost:3000/publications
app.get("/publications", async (req,res) => {
    const getAllPublications = await PublicationModel.find();
    console.log(getAllPublications);
    return res.json(getAllPublications); 
});

//localhost:3000/publication-isbn/12345Two --hw
app.get("/publication-isbn/:isbn", async (req,res) => {
    const {isbn} =  req.params;
    console.log(isbn);
    const getSpecificPublication = await PublicationModel.findOne({books: isbn}); //books is the category, where u r trying to access its isbn key values
    console.log(getSpecificPublication);
    if (getSpecificPublication===null) {
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
app.post("/author", async(req,res) => {
    // console.log(req.body);
    const addNewAuthor = await AuthorModel.create(req.body);  
    return res.json({authorAdded: addNewAuthor,message: "Author was added !!!"});
});

//localhost:3000/publication
app.post("/publication", async (req,res) => {
    // console.log(req.body);
    const addNewPublication = await PublicationModel.create(req.body);  
    return res.json({PublicationAdded: addNewPublication,message: "A new publication was added !!!"});  
});

//localhost:3000/book-update/978-81-87910-03-9
app.put("/book-update/:isbn", async (req,res) => {
    // console.log(req.body);
    // console.log(req.params);
    const {isbn} = req.params;
    const updateBook = await BookModel.findOneAndUpdate({ISBN: isbn}, req.body, {new: true});  
    return res.json({bookUpdated: updateBook,message: "Book was updated !!!"});
});

//localhost:3000/author-update/1
app.put("/author-update/:id", async(req,res) => {
    // console.log(req.body);
    // console.log(req.params);
    const {id} = req.params;
    const updateAuthor = await AuthorModel.findByIDAndUpdate(id, req.body,{new:true});
    return res.json({authorUpdated: updateAuthor, message:"Author was updated !!!!"}) ;
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

//localhost:3000/book-delete/12345Four
app.delete("/book-delete/:isbn", async (req,res) => {
    // console.log(req.params);
    const {isbn} = req.params;
    const deleteBook = await BookModel.deleteOne({ISBN: isbn}); 
    if (deleteBook.deletedCount > 0) 
        { 
            return res.json( {bookDeleted: deleteBook, message: "Book was Deleted !!!"} ); 
        }
    else {
        return res.json({bookDeleted: deleteBook, message: "Book  was not found to delete !!!"} );
    }
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