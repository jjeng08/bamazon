const db = require('../models');

module.exports = function(app) {

  // GET Request
  // Responds with all the currently booked reservations
  app.get('/api/products', function(req, res) {
    db.Product.findAll({}).then(function(rows) {
      res.json(rows)
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

}