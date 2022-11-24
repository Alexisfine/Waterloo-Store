import expressAsyncHandler from "express-async-handler";
import orderModel from "../models/orderModel.js";
import Order from "../models/orderModel.js";

// Create order
// Post /api/orders
// Private
const addOrderItems = expressAsyncHandler(async (req,res) => {
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice} = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order info');
    } else {
        const order = new Order({
            user:req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
        })
        const createOrder = await order.save();
        res.status(201).json(createOrder);
    }
})

// Get order info by id
// GET /api/orders/:id
// Private
const getOrderById = expressAsyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id).populate(
        ('user')
    );
    if (order) {
        res.json(order)
    } else {
        res.status(404);
        throw new Error('cannot find order')
    }
})

export {addOrderItems, getOrderById};