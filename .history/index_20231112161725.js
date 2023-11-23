//MAIN BCAKEND FILE

const db = require("./database/index.js"); //import index of db 
// console.log(db.books);
// console.log(db.authors);
// console.log(db.publications);

const express = require("express");
const app = express();

app.get("/", (req,res) => {
    const getAllBooks = db.books;
    return res.json(getAllBooks); //or this also works: res.send("getALLBooks")
});

app.get("/is/:isbn", (req,res) => {
    const {isbn} = req.params;
    const getSpecificBook = db.books.filter((book) => book.ISBN === isbn);
    if(getSpecificBook.length===0) {
         res.send({"error": `No Book found for the ISBN of ${isbn}`});
    }
     res.send(getSpecificBook[0]);
});

app.listen(3000, () => {
    console.log("our First Express is running at localhost:3000");
});