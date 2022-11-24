import jwt from 'jsonwebtoken';
import UserModel from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

const protect = expressAsyncHandler( async (req,res,next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await UserModel.findById(decoded.id).select('-password');

        } catch {
            res.status(401);
            throw new Error('Not authorized, token verification failed')
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
    next();
})

const admin = (req,res,next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized, not admin');
    }

}

export {protect, admin};