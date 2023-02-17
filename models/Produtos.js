
const Produtos = sequelize.define('Produtos', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  preco: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

  module.exports = Produtos; 
  
  