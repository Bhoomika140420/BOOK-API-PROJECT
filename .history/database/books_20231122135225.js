const mongoose = require("mongoose");

//create books schema 
const BookSchema = mongoose.Schema( 
    {
        ISBN: String,
        title: String,
        authors:[Number], //array of numbers
        Language: String,
        pubDate: String,
        numOfPage:Number,
        category:[String],  //array of strings
        publication: Number
    }
);
    


const BookModel = mongoose.model("books",BookSchema);

module.exports = BookModel;