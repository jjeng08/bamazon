const db = require('../models');

module.exports = function(app) {

app.get('/api/products', function(req, res) {
    db.Product.findAll({}).then(function(rows) {
      res.json(rows)
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

app.get('/api/products/:id', function(req, res) {
  db.Product.findALL({
    where:{
      id:req.params.id
    }
  }).then(function(data) {
    res.json(data);
  }).catch(function(err) {
    res.json(err);
  })
});

  app.post('/api/products', function(req, res) {
    db.Product.create(req.body).then(function(rows) {
      res.json({ success: true });
    }).catch(function(error) {
      res.json({ error: error })
    });
  });

//Here, it's set up to take the ID from the URL string and input a whole new body where the ID matches.
//So we want the basic structure to be the same, albeit with default values in the body so only the stock amount gets modified.
//We also want to change the id input so it takes it from a UI rather than a url string.

//BASIC STRUCTURE:
//1. Get data into the table.
//2. Have a 'GET' function run and automatically populate the page (see 08-sequelize/03-day/01-stu_front_end for a render function).
//3. Have it populate so that all the body values are stuck (id, name, company, etc.) EXCEPT for stock.
//4. Use a validated input so that someone can order up to the stock available.
//5. Make the submit button a 'PUT' request that re-enters the item (referencing the static ID) and modifies the stock.

app.put('/api/products/:id', function(req, res) {
    db.Product.update(
      req.body,
      { where: { id: req.params.id } }
    ).then(function() {
      res.json({ success: true });
    }).catch(function(error) {
      res.json({ error: error });
    });
  });
  }