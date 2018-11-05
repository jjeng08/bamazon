const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

const db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================
require('./routes/api-routes.js')(app);

db.sequelize.sync({}).then(function () {
	app.listen(PORT, function () {
		console.log('App listening on PORT ' + PORT);
	});
});