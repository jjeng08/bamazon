// Import Database Models
// =============================================================
const db = require('../models');

// Syncing our sequelize models 
// =============================================================
const items = [
    {
        productName: 'BANANAS',
        departmentName: 'Banana Republic',
        price: 0.89,
        stock: 3000
    }, {
        productName: 'newts',
        departmentName: 'Totally Not a Witch',
        price: 9,
        stock: 25
    }, {
        productName: 'Go the F**k to Sleep',
        departmentName: 'Samuel L. Jackson',
        price: 15,
        stock: 40
    }, {
        productName: 'Goat Simulator',
        departmentName: 'ASDF Games',
        price: 60,
        stock: 7
    }, {
        productName: 'Doki Doki Kawaii Desu',
        departmentName: 'Weeb Industries',
        price: 33,
        stock: 14
    }, {
        productName: "Best of 90's Boy Bands",
        departmentName: 'Nostalia Inc.',
        price: 30,
        stock: 30
    }, {
        productName: 'Mandatory Google Cranial Implant',
        departmentName: 'Your New Techno Overlords',
        price: .01,
        stock: 10000000
    }, {
        productName: 'iPhoneLXIV',
        departmentName: 'Apple Inc.',
        price: 90000,
        stock: 500
    }, {
        productName: 'lPhone33',
        departmentName: 'Bapple Inc.',
        price: 8999,
        stock: 17
    }, {
        productName: 'Necronomicon',
        departmentName: "Ys'lsgw'oth",
        price: 592364,
        stock: 1
    },
]

db.sequelize.sync({ force: true }).then(function () {
    db.Product.bulkCreate(items)
        .then(function (rows) {
            console.log("\n\nINSERTED\n\n");
            db.sequelize.close();
        })
        .catch(function(err) {
            console.log("\n\nError:", err);
            db.sequelize.close();
        });
});