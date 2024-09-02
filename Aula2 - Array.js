db.students.drop();
db.students.insertMany(
[
  { "_id": 1, "name": "Alice", "courses": ["Math", "English"] },
  { "_id": 2, "name": "Bob", "courses": ["Math", "History"] },
  { "_id": 3, "name": "Charlie", "courses": ["Biology", "Chemistry"] }
]
);

db.students.find()

// Exercício 1: Utilize $push para adicionar o curso "Physics" ao array courses do estudante Alice (_id: 1).
db.students.updateOne(
  { "_id": 1, },
  { $push: { courses: "Physics" } }
);

// Exercício 2: Use $addToSet para adicionar o curso "Math" ao array courses do estudante Charlie (_id: 3). Verifique o comportamento do operador.
db.students.updateOne(
    {"_id":3},
    {$addToSet: {courses:"Math"}}
    );

// Exercício 3: Remova o primeiro curso da lista de courses do estudante Bob (_id: 2) usando $pop.
db.students.updateOne(
    {"_id":2},
    {$pop: {courses:-1}}
    );


// Exercício 4: Use $pull para remover o curso "History" do array courses do estudante Bob (_id: 2).
db.students.updateOne(
    {"_id":2},
    {$pull: {courses:"History"}}
    );


// Exercício 5: Adicione os cursos "Philosophy" e "Economics" ao array courses do estudante Alice (_id: 1) de uma única vez usando $push com a opção $each.
db.students.updateOne(
    {"_id":1},
    {$push:{courses:{$each: ["Philosophy","Economics"]}}}
    );

// Exercício 6: Remova todos os cursos "Math" dos arrays de todos os estudantes usando $pull.
db.students.updateMany({},{$pull:{courses:"Math"}});

// Exercício 7: Adicione o curso "Computer Science" ao array courses de todos os estudantes que ainda não têm esse curso usando $addToSet.
db.students.updateMany({},{$addToSet: {courses:"Computer Science"}});

// Exercício 8: Adicione o curso "Art" ao final do array courses de todos os estudantes e, em seguida, remova o último curso do array, usando $push e $pop.
db.students.updateMany({},{$push:{courses:"Art"}});
db.students.updateMany({},{$pop:{courses:1}})

// Exercício 9: Crie um campo extra_courses para o estudante Charlie (_id: 3) e adicione dois cursos adicionais ("Music", "Drama") a esse novo array usando $push.
db.students.updateOne(
    {"_id":3},
    {$push:{extra_courses:{$each: ["Music","Drama"]}}}
    );

// Exercício 10: Use $addToSet para garantir que nenhum curso duplicado seja adicionado ao array extra_courses do estudante Charlie (_id: 3) ao tentar adicionar "Music" novamente.
db.students.updateOne({"_id":3},{$addToSet:{extra_courses:"Music"}});