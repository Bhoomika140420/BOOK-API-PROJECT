const mongoose = require("mongoose");

// create author schema

const AuthorSchema =  mongoose.Schema(
    {
        id: Number,
        name: String,
        books: [String] // array of strings
    }
);

const AuthorModel = mongoose.model("authors",AuthorSchema);

module.exports = AuthorModel;