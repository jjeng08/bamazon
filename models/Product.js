module.exports = function(connection, Sequelize) {
	var Product = connection.define('Product', {
	 productName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
		  notEmpty: true
		}
	  },
	  departmentName: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
		  notEmpty: true
		}
	  },
	  price: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
		  notEmpty: true
		}
	  },
	  stock: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
		  notEmpty: true
		}
	  }
	});
  
	return Product;
  };
  