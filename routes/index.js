const { Router } = require('express');
var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

const produtoPath = path.resolve(__dirname, '../databases/dados.json')

function getProdutos (){
  return JSON.parse(fs.readFileSync(produtoPath))
  
}

function saveProdutos (produtos){
fs.writeFileSync(produtoPath, JSON.stringify(produtos , null , 4))
}



/* GET home page. */
router.get('/', function(req, res, next) {
  const produtosPet = getProdutos();
  res.render('index', { title: 'Express', produtosPet });
});

// adicionar produtosPet

router.get('/adicionar-produto', function(req,res){
  const produtosPet = getProdutos();
  res.render('adicionar-produto', { title: 'Express', produtosPet: getProdutos() });
})

router.post('/', function(req,res){
  let produtos = getProdutos();
produtos.push({
  id:produtos[produtos.length - 1].id + 1,
  ...req.body
  
});
saveProdutos(produtos)
res.redirect('/')
})


router.delete('/deletar/:id', (req,res)=>{
  const id = req.params.id;
  let produtos = getProdutos();

   produtos = produtos.filter(produto => produto.id != id)

  saveProdutos(produtos)
  res.redirect('/')
})
// Editar produtosPet

router.get('/editar/:id', (req,res)=>{
const id = req.params.id;
const produtosPet = getProdutos();
const produto = produtosPet.find(p => p.id == id);

res.render('editar-produto', {title: 'Express', produto});

});

router.put('/:id', (req,res)=>{
  const id = req.params.id;
  let produtoPet = getProdutos();
  const index = produtoPet.findIndex(p => p.id == id);

  produtoPet[index] = {...produtoPet[index], ...req.body};
  saveProdutos(produtoPet);
  res.redirect('/')

})

module.exports = router;
