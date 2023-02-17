const {Produtos} = require('../models');


module.exports = {
  index: async(req,res)=>{
const produtos = await Produtos.findAll();
where:{
  id:1
}
res.render('produtos',{produtos});
  }
}