// Import Database Models
// =============================================================
const db = require('../models');

// Syncing our sequelize models 
// =============================================================
db.sequelize.sync().then(function () {
    db.Product.bulkCreate([{
        productName: 'Head Phones',
        departmentName: 'Apple',
        price: 20,
        stock: 30
    }, {
        productName: 'Basket Ball',
        departmentName: 'My Tennis Balls Corp',
        price: 8,
        stock: 30
    }, {
        productName: 'Doggie Shark Costume',
        departmentName: 'Doggo Halloween Inc.',
        price: 20,
        stock: 30
    }, {
        productName: 'Sneakers',
        departmentName: 'Nike',
        price: 50,
        stock: 30
    }, {
        productName: 'Yoyo',
        departmentName: '2000 Inc',
        price: 5,
        stock: 30
    }, {
        productName: 'Walkman',
        departmentName: '2000 Inc',
        price: 30,
        stock: 30
    }, {
        productName: 'Mackbook Pro',
        departmentName: 'Apple',
        price: 1200,
        stock: 30
    }, {
        productName: 'iPhone',
        departmentName: 'Apple',
        price: 900,
        stock: 30
    }, {
        productName: 'Dog Collar',
        departmentName: 'Doggos Inc',
        price: 10,
        stock: 30
    }, {
        productName: 'Yoyo',
        departmentName: '2000 Inc',
        price: 5,
        stock: 30
    },
    ]).then(function (data) {
        console.log('Data successfully added!');
    }).catch(function (error) {
        console.log('Error', error)
    });
});