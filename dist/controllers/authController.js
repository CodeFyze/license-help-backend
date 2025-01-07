"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../models/user");
const jwt_1 = require("../config/jwt");
const register = async (req, res) => {
    const { username, email, password, role, firstName, surname, phone, postcode, transmission, subject, message } = req.body;
    console.log('Register request received');
    console.log('Request Body:', req.body); // Be cautious  when logging sensitive data like passwords.
    try {
        // Ensure password is provided
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }
        // Check if user already exists
        const existingUser = await user_1.User.findOne({ email });
        if (existingUser) {
            console.log('User already exists');
            return res.status(400).json({ message: 'User already exists' });
        }
        // Declare the variable for transmission outside the condition
        let instructorTransmission = transmission;
        // If the role is 'instructor', make sure all instructor fields are provided
        if (role === user_1.UserRole.Instructor) {
            if (!firstName || !surname || !phone || !postcode || !subject || !message) {
                return res.status(400).json({ message: 'All instructor fields are required (firstName, surname, phone, postcode, subject, message)' });
            }
            // If role is instructor, check if 'transmission' is provided, else default to 'Automatic'
            instructorTransmission = instructorTransmission || 'Automatic'; // Default to 'Automatic' if not provided
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        console.log('Hashed Password:', hashedPassword); // Log only if necessary.
        // Create new user
        const user = new user_1.User({
            username,
            email,
            password: hashedPassword,
            role: role || user_1.UserRole.Student,
            firstName: role === user_1.UserRole.Instructor ? firstName : undefined,
            surname: role === user_1.UserRole.Instructor ? surname : undefined,
            phone: role === user_1.UserRole.Instructor ? phone : undefined,
            postcode: role === user_1.UserRole.Instructor ? postcode : undefined,
            transmission: role === user_1.UserRole.Instructor ? instructorTransmission : undefined,
            subject: role === user_1.UserRole.Instructor ? subject : undefined,
            message: role === user_1.UserRole.Instructor ? message : undefined,
        });
        // Save the user
        await user.save();
        console.log('User saved:', user);
        // Generate JWT token
        const token = (0, jwt_1.generateToken)(user._id.toString(), user.role);
        console.log('Generated Token:', token);
        res.status(201).json({ token, userId: user._id, role: user.role });
    }
    catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login request received');
    console.log('Request Body:', req.body); // Be cautious when logging sensitive data like passwords.
    try {
        // Find the user by email
        const user = await user_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        // Compare passwords
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = (0, jwt_1.generateToken)(user._id.toString(), user.role);
        console.log('Generated Token:', token);
        res.status(200).json({ token, userId: user._id, role: user.role });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
};
exports.login = login;
