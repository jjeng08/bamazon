// Import Database Models
// =============================================================
const db = require('../models');

// Syncing our sequelize models 
// =============================================================
db.sequelize.sync().then(function () {
    db.Product.bulkCreate([{
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
    ]).then(function (data) {
        console.log('Data successfully added!');
    }).catch(function (error) {
        console.log('Error', error)
    });
});