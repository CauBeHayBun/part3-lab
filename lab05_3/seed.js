// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Supplier = require('./models/Supplier');
const Product = require('./models/Product');
const User = require('./models/User');

const MONGODB_URI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/lab05_3';

(async() => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Mongo connected for seeding');

        await Product.deleteMany({});
        await Supplier.deleteMany({});
        await User.deleteMany({});

        const suppliers = await Supplier.insertMany([
            { name: 'Supplier A', address: 'HCM', phone: '0909000001' },
            { name: 'Supplier B', address: 'HN', phone: '0909000002' }
        ]);

        await Product.insertMany([
            { name: 'Laptop Dell', price: 1500, quantity: 10, supplier: suppliers[0]._id },
            { name: 'iPhone 14', price: 999, quantity: 20, supplier: suppliers[1]._id },
            { name: 'Samsung TV', price: 1200, quantity: 5, supplier: suppliers[0]._id }
        ]);

        await User.create({ username: 'admin', password: 'admin123', email: 'admin@example.com' });

        console.log('✅ Seed done');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();