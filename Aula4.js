//produtos
db.produtos.insertMany([
    { "nome": "Laptop", "preco": 2000, "categoria": "Eletrônicos", "estoque": 10 },
    { "nome": "Cadeira", "preco": 150, "categoria": "Móveis", "estoque": 20 },
    { "nome": "Mesa", "preco": 500, "categoria": "Móveis", "estoque": 5 },
    { "nome": "Celular", "preco": 1500, "categoria": "Eletrônicos", "estoque": 8 },
    { "nome": "Caneta", "preco": 5, "categoria": "Papelaria", "estoque": 100 }
  ])
  
  //vendas
  db.vendas.insertMany([
    { "produtoId": 1, "quantidade": 3, "dataVenda": "2024-08-01" },
    { "produtoId": 2, "quantidade": 2, "dataVenda": "2024-08-02" },
    { "produtoId": 3, "quantidade": 1, "dataVenda": "2024-08-03" },
    { "produtoId": 1, "quantidade": 4, "dataVenda": "2024-08-04" },
    { "produtoId": 4, "quantidade": 5, "dataVenda": "2024-08-05" }
  ])
  
  //Ex3.Crie uma agregação que calcule o valor total em estoque para cada categoria de produtos. Ou seja, multiplique o preço pelo estoque e agrupe os valores por categoria.
  db.produtos.aggregate([
    {
      $group: {
        _id: "$categoria",
        valorTotal: { $sum: { $multiply: ["$preco", "$estoque"] } }
      }
    }
  ])
  
  //Exercício 4:Ainda usando a coleção produtos, crie uma agregação que retorne o preço médio dos produtos por categoria.
  db.produtos.aggregate([
    {
      $group: {
        _id: "$categoria",
        PrecoMédio: { $avg:"$preco" }
      }
    }
  ])
  
  
  //Ex5.Crie uma agregação que retorne o total de vendas (quantidade) por produto.
  db.vendas.aggregate([
      {
          $group: { 
              _id: "$produtoId",
              total_vendas:{ $sum: "$quantidade" }
          }
      }])
      
  //Ex6.Dada a mesma coleção vendas, crie uma agregação que retorne a quantidade total vendida por dia, ordenando os resultados pela data de venda.
  db.vendas.aggregate([{
      $group: { 
          _id: "$dataVenda",
         venda_por_dia: {$sum:"$quantidade"} 
      }
  }])
  
  
  
  
  
  
  