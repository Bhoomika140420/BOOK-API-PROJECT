let books = [
    {
        ISBN: "12345One",
        title: "Getting started with MERN",
        authors: [1, 2],
        Language: "en",
        pubDate: "2021-07-07",
        numOfPage: 225,
        category: ["fiction", "programming", "tech", "web dev"],
        publication: 1,
    },
       {  
        ISBN: "12345Two",
        title: "Getting started with Python",
        authors: [1, 2],
        Language: "en",
        pubDate: "2021-08-07",
        numOfPage: 550,
        category: ["fiction", "tech", "web dev","non fiction"],
        publication: 1,
    }
];

let authors = [ 

   , {
    id: 1,
    name: "Bhoomika",
    books: ["12345One","12345Two","Revolution2020","Ambitionto Vision"],
}

{
    id: 2,
    name: "Lisa",
    books: ["12345One","12345Two","Death","Inner Engineering"],
} 

];

let publications = [
    {
        id: 1,
        name: "Rose Publications",
        books: ["12345One","12345Two"]
    },
    
    {
        id: 2,
        name: "Jisso Publications",
        books: ["12345Two"]
    }
]

module.exports = {books, authors, publications};

