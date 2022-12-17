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

// Get all order info
// GET /api/orders
// Private
const getOrders = expressAsyncHandler(async (req,res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
})

// Update order info
// Put /api/orders/:id/pay
// Private
const updateOrderAfterPaid = expressAsyncHandler(async (req,res) => {
    const orders = await Order.findById(req.params.id);
    if (orders) {
        orders.isPaid = true;
        orders.paidAt = Date.now();
        orders.paymentResult = {
            id: req.params.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address : req.body.email_address,
        }
        const updatedOrder = await Order.save();
        res.json(updatedOrder);

    } else {
        res.status(404);
        throw new Error('cannot find order');
    }
})

export {addOrderItems, getOrderById, getOrders, updateOrderAfterPaid};