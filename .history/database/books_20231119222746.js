const mongoose = require("mongoose");

//create books schema 
const BookSchema = mongoose.Schema( {
    ISBN:"12345Four",
    title:"Getting started with Express",
    authors:[1],
    Language:"en",
    pubDate:"2021-09-07",
    numOfPage:{"$numberInt":"2250"},
    category:["programming","tech","web dev"],
    publication:2
}
);
    


const BookModel = mongoose.model("books",BookSchema);

module.exports = BookModel;