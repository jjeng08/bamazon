const db = require('../models');

module.exports = function (app) {

  app.get('/api/products', function (req, res) {
    db.Product.findAll({}).then(function (rows) {
      res.json(rows)
    }).catch(function (error) {
      res.json({ error: error });
    });
  });

  app.get('/api/products/:id', function (req, res) {
    db.Product.findALL({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.json(data);
    }).catch(function (err) {
      res.json(err);
    })
  });

  app.post('/api/products', function (req, res) {
    db.Product.create(req.body).then(function (rows) {
      res.json({ success: true });
    }).catch(function (error) {
      res.json({ error: error })
    });
  });

  app.put('/api/products/:id', function (req, res) {
    db.Product.update(
      req.body,
      { where: { id: req.params.id } }
    ).then(function () {
      res.json({ success: true });
    }).catch(function (error) {
      res.json({ error: error });
    });
  });
}