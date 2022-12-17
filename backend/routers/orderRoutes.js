import express from 'express';
import {addOrderItems, getOrderById, getOrders, updateOrderAfterPaid} from "../controller/orderController.js";
import {admin, protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').post(protect,addOrderItems).get(protect, admin, getOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderAfterPaid);
export default router;