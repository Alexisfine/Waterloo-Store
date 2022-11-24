import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';

import users from './data/users.js';
import products from './data/products.js';

import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // Remove all data
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product)=>{
            return {...product, user:adminUser}
        })

        await Product.insertMany(sampleProducts);

        console.log('product info is inserted'.green.inverse);

        process.exit(1);

    } catch (error) {
        console.log(error.message);
    }
}



const destroyData = async () => {
    try {
        // Remove all data
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        console.log('Data is deleted');
        process.exit(1);

    } catch (error) {
        console.log(error.message);
    }
}

if (process.argv[2] === '-d') {
    destroyData();
}
else {
    importData();
}