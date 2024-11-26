"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../models/user"); // Import models for each role
const jwt_1 = require("../config/jwt");
// Utility function to choose the correct model based on the role
const getModelForRole = (role) => {
    switch (role) {
        case user_1.UserRole.Instructor:
            return user_1.Instructor;
        case user_1.UserRole.Admin:
            return user_1.Admin;
        case user_1.UserRole.Student:
        default:
            return user_1.Student; // Default to Student model
    }
};
// Register a new user
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    console.log('Register request received');
    console.log('Request Body:', req.body); // Log the incoming data
    try {
        // Check if the user already exists
        const existingUser = yield getModelForRole(role).findOne({ email });
        if (existingUser) {
            console.log('User already exists');
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        console.log('Hashed Password:', hashedPassword);
        // Get the correct model based on role
        const UserModel = getModelForRole(role);
        // Create a new user
        const user = new UserModel({
            username,
            email,
            password: hashedPassword,
            role: role || user_1.UserRole.Student, // Default role to 'student' if not provided
        });
        // Save the user to the database
        yield user.save();
        console.log('User saved:', user);
        // Generate a token for the new user
        const token = (0, jwt_1.generateToken)(user._id.toString(), user.role);
        console.log('Generated Token:', token);
        // Send the response with the token and user info
        res.status(201).json({ token, userId: user._id, role: user.role });
    }
    catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});
exports.register = register;
// Login an existing user
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log('Login request received');
    console.log('Request Body:', req.body);
    try {
        // Find the user by email (search across all collections based on email)
        const student = yield user_1.Student.findOne({ email });
        const instructor = yield user_1.Instructor.findOne({ email });
        const admin = yield user_1.Admin.findOne({ email });
        const user = student || instructor || admin; // First match found
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'User not found' });
        }
        // Compare the password with the hashed password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid credentials');
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate a token for the user
        const token = (0, jwt_1.generateToken)(user._id.toString(), user.role);
        console.log('Generated Token:', token);
        // Send the response with the token and user info
        res.json({ token, userId: user._id, role: user.role });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
});
exports.login = login;
