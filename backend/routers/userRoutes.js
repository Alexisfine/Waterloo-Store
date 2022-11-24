import express from 'express';
import {
    authUser,
    deleteUser, getUserById,
    getUserProfile,
    getUsers,
    registerUser, updateUserById,
    updateUserProfile
} from "../controller/userControllers.js";
import {admin, protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/').post(registerUser).get(protect, admin, getUsers);
router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUserById);

export default router;


