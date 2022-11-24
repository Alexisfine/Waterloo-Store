import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js';
import UserModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


// Create new account
// POST/api/user
// Public
const registerUser = expressAsyncHandler(async (req,res) => {
    const {name, email, password} = req.body;
    // check if this user already exists
    const userExist = await UserModel.findOne({email});
    if (userExist) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await UserModel.create({name, email, password});
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }


})


// User verification
// Path: POST/api/users/login
// Public

const authUser = expressAsyncHandler(async (req,res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    if (user && await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401);
        throw new Error('Email or password is invalid');
    }

})

// Getting user info from logged in user
// GET/api/users/profile
// Private

const getUserProfile = expressAsyncHandler(async (req,res) => {
    const user = await UserModel.findById(req.user._id);
    if (user) {
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,

        })
    } else {
        res.status(404);
        throw new Error('User does not exists')
    }
})

// Update user info from login  user
// PUT/api/users/profile
// Private

const updateUserProfile = expressAsyncHandler(async (req,res) => {
    const user = await UserModel.findById(req.user._id);
    // Get updated user profile
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updateUser = await user.save();
        res.json({
            id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id),

        })
    } else {
        res.status(404);
        throw new Error('User does not exists')
    }
})

// Get All Users' Info
// GET/api/users
// Private admin only
const getUsers = expressAsyncHandler(async (req,res) => {
    const users = await UserModel.find({});
    res.json(users);

})

// Delete user account
// Delete/api/users/:id
// Private admin only
const deleteUser = expressAsyncHandler(async (req,res) => {
    const user = await UserModel.findById(req.params.id);
    if (user) {
        await user.remove();
        res.json({message:'user remove success'})
    } else {
        res.status(404);
        throw new Error('User cannot be found')
    }

})


// Get user account info
// GET/api/users/:id
// Private admin only
const getUserById = expressAsyncHandler(async (req,res) => {
    const user = await UserModel.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User cannot be found')
    }
})

// Update user account info
// PUT/api/users/:id
// Private admin only
const updateUserById = expressAsyncHandler(async (req,res) => {
    const user = await UserModel.findById(req.params.id).select('-password');
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin ;

        const updateUser = await user.save();
        res.json({
            id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        })

    } else {
        res.status(404);
        throw new Error('User cannot be found')
    }
})




export {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUserById}

