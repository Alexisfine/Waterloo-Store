import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const getProducts = expressAsyncHandler(async (req,res) => {
    const products = await Product.find({});
    res.json(products);
})

const getProductById = expressAsyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    }
    else {
        res.status('404');
        throw new Error('No results found');
    }
})

// Delete a product
// DELETE/api/products/:id
// private
const deleteProductById = expressAsyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({message:'product is deleted'})
    }
    else {
        res.status('404');
        throw new Error('No product found');
    }
})

// Add a product
// POST/api/products
// private

const createProduct = expressAsyncHandler(async (req,res) => {
    // Create a product model
    const product = new Product({
        name: 'Sample Product',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'Sample',
        category: 'Sample class',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
        rating: 0,
    })

    const createdProduct = await product.save();
    res.status(201);
    res.json(createdProduct);

})

// Update a product
// PUT/api/products/:id
// private
const updateProduct = expressAsyncHandler(async (req,res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        const updatedProduct = await product.save();
        res.status(201);
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found')
    }


})



export {getProducts,getProductById, deleteProductById, createProduct, updateProduct};