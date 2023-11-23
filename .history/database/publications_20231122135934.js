const mongoose = require("mongoose");

// create author schema

const PublicationSchema =  mongoose.Schema(
    {
        id: Number,
        name: String,
        books: [String] // array of strings
    }
);

const PublicationModel = mongoose.model("publications",PublicationSchema);

module.exports = PublicationModel;