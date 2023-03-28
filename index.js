const axios = require('axios');
const express = require('express');
const app = express();
const port = 3000;
const { Pool } = require('pg');

let dados;
let informacao_catalogo = [];

//buscar dados do Redash
function buscarDados() {
    console.log("buscou");
  axios.get('https://redash.marche.com.br/api/queries/1077/results.json?api_key=hrOsZa6DWijufh3nFhWpasDlsNnpnXjNZcbc52rK')
    .then(response => {
      dados = response.data.query_result.data.rows;
      Object.keys(dados).forEach(function(key) {
        informacao_catalogo.push(dados[key]);
      });
    })
    .catch(error => {
      console.error(error);
    });
}

//fazer a primeira busca e repetir a cada 5 minutos
buscarDados();
setInterval(buscarDados, 5*60*1000);


//método GET para pegar a lista (a saida virá do banco de dados posteriormente)
app.get('/api/data', (req, res) => {
  res.json(informacao_catalogo);
  //Object.keys(informacao_catalogo).forEach(function(key) {
   // let precoAtual = informacao_catalogo[key].price;
   // let precoNoBanco = buscarDados(informacao_catalogo[key].id)
   // if(IspriceInvalid(precoAtual, precoNoBanco)){
   //     console.log("preço invalido")
   // }
   // else{
   //     inserirDados(informacao_catalogo[key])
   // }
  });


//apenas log para ver que está rodando
app.listen(port, () => {
  console.log(`A API está rodando na porta ${port}.`);
});

//SQLs de criação, inserção e consulta

function criarTabela(){
    //CREATE TABLE IF NOT EXISTS dados (
      //  id INTEGER PRIMARY KEY,
        //category TEXT,
        //description TEXT,
        //created_at TEXT,
        //updated_at" TEXT,
        //price REAL,
        //link TEXT,
        //image TEXT
        //availability TEXT
        //stock INTEGER
        //)
}

function inserirDados(dado){
    //INSERT INTO dados (id, category,
    //description, created_at, updated_at, price, link,
    //image, availability, stock
    //)
    //VALUES (dado)
    //)
}


function buscarPreco(id){
    //'SELECT price FROM dados
    //WHERE id =' + id
}

//verificação de preços
function IspriceInvalid(preco1, preco){
    if (preso2 > preco1 * 1.4){
        return true
    }
    else{
        return false
    }
}

















