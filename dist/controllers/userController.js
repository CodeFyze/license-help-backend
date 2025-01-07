"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.assignRole = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = require("mongoose");
const jwt_1 = require("../config/jwt");
const getUsers = async (req, res) => {
    console.log('getUsers endpoint hit');
    try {
        const { role } = req.query; // Extract role from query
        const query = role ? { role } : {};
        const users = await user_1.User.find(query).select('-password'); // Exclude password from response
        console.log('Retrieved Users:', users); // Log the fetched users
        res.json(users); // Respond with the users
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching users:', error.message);
        }
        else {
            console.error('Unknown error:', error);
        }
        res.status(500).json({ message: 'Error fetching users' });
    }
};
exports.getUsers = getUsers;
// Get a single user by ID
const getUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    try {
        const user = await user_1.User.findById(id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
};
exports.getUser = getUser;
// Update user details (username, email, role)
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, role } = req.body;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    try {
        const user = await user_1.User.findByIdAndUpdate(id, { username, email, role }, { new: true });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};
exports.updateUser = updateUser;
// Delete a user by ID
const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    try {
        const user = await user_1.User.findByIdAndDelete(id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};
exports.deleteUser = deleteUser;
// Assign a new role to a user
const assignRole = async (req, res) => {
    const { userId, role } = req.body;
    try {
        const user = await user_1.User.findById(userId);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        user.role = role;
        await user.save();
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error assigning role' });
    }
};
exports.assignRole = assignRole;
// Register a new user
const register = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const existingUser = await user_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = new user_1.User({
            username,
            email,
            password: hashedPassword,
            role: role || user_1.UserRole.Student, // Default to 'student' if no role is provided
        });
        await user.save();
        const token = (0, jwt_1.generateToken)(user._id.toString(), user.role);
        res.status(201).json({ token, userId: user._id, role: user.role });
    }
    catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};
exports.register = register;
