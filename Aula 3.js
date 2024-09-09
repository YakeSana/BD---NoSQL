// Coleção "authors"
db.authors.insertMany([
  { "_id": 1, "name": "John Doe", "age": 45 },
  { "_id": 2, "name": "Jane Smith", "age": 38 },
  { "_id": 3, "name": "Alice Johnson", "age": 50 }
]);

// Coleção "books"
db.books.insertMany([
  { "_id": 101, "title": "MongoDB Mastery", "author_id": 1, "year": 2020 },
  { "_id": 102, "title": "NoSQL Explained", "author_id": 2, "year": 2019 },
  { "_id": 103, "title": "Advanced Databases", "author_id": 3, "year": 2018 },
  { "_id": 104, "title": "Introduction to MongoDB", "author_id": 1, "year": 2021 }
]);

db.books.find();
db.authors.find();

// Exercício 1: Utilize $lookup para combinar as coleções authors e books e retornar o nome do autor e o título do livro.
db.authors.aggregate([
    {
        $lookup: {
               from: "books",
               localField: "_id",
               foreignField: "author_id",
               as: "book"
             }
    },
    {$project: {
        "name":1,
        "book.title":1
    }}
    ])

// Exercício 2: Use $lookup para retornar o nome do autor e todos os livros que ele escreveu.
db.authors.aggregate([
    {
        $lookup: {
               from: "books",
               localField: "_id",
               foreignField: "author_id",
               as: "book"
             }
    },
    {$project: {
        "name":1,
        "book.title":1
    }}
    ])


// Exercício 3: Adicione o campo nationality aos documentos da coleção authors usando $set.
db.authors.updateMany(
    {},
    {$set:{"nationality":""}}
    );

// Exercício 4: Realize um $lookup para retornar o autor que escreveu o livro "MongoDB Mastery".
db.authors.aggregate([
    {
        $lookup: {
               from: "books",
               localField: "_id",
               foreignField: "author_id",
               as: "book"
             }
    },
    {
   $match: { "book.title": "MongoDB Mastery" }
  },   
    {$project: {
        "name":1,

    }}
    ])

// Exercício 5: Faça um $lookup entre authors e books e filtre a saída apenas para os autores que escreveram livros após 2019, usando $match.
db.authors.aggregate([
    {
        $lookup: {
               from: "books",
               localField: "_id",
               foreignField: "author_id",
               as: "book"
             }
    },
    {
   $match: { "book.year": 2019 }
  },   
    {$project: {
        "name":1,

    }}
    ])


// Exercício 6: Combine as coleções e ordene os resultados por idade dos autores, usando $lookup e $project.
db.authors.aggregate([
    {
        $lookup: {
               from: "books",
               localField: "_id",
               foreignField: "author_id",
               as: "book"
             }
    },
    {$project: {
        "name":1,
        "age":1,
    }}
    ]).sort({"age": 1})

// Exercício 7: Realize um relacionamento 1-N: Encontre todos os livros escritos por "John Doe" (autor_id = 1) e retorne todos os títulos.
db.authors.aggregate([
    {$match:{"name":"John Doe"}},
    {
        $lookup: {
               from: "books",
               localField: "_id",
               foreignField: "author_id",
               as: "book"
             }
    },
    {$unwind: "$book"},
    {$project: {
        "book.title":1
    }}
    ])

// Exercício 8: Use $unwind para desfazer a junção entre authors e books, mostrando um documento por livro escrito por cada autor.
db.authors.aggregate([
    {
        $lookup: {
               from: "books",
               localField: "_id",
               foreignField: "author_id",
               as: "book"
             }
    },
    {$unwind: "$book"},
    ])

// Exercício 9: Adicione um novo campo chamado author_bio na coleção books, onde cada autor recebe uma breve biografia.
db.books.updateMany(
    {},
    {$set:{"author_bio":""}}
    );

// Exercício 10: Faça um $lookup e combine autores e livros, mas retorne apenas os documentos em que o autor não tem livros na coleção books, utilizando $lookup com pipeline e $match.
//   db.authors.aggregate([
//       {$match:{}},
//       {
//           $lookup: {
//                  from: "books",
//                  localField: "_id",
//                  foreignField: "author_id",
//                  as: "book"
//               }
//       },

//       ])