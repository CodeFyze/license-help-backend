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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const user_1 = require("../models/user"); // Import the models for each role
const mongoose_1 = require("mongoose");
// Utility function to get the correct model based on role or collection
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
// Get all users (across all collections)
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = req.query;
    try {
        // Select the correct model based on the role query
        const UserModel = role ? getModelForRole(role) : user_1.Student; // Default to Student if no role is provided
        const users = yield UserModel.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});
exports.getUsers = getUsers;
// Get a single user by ID
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    try {
        // Find the user in all possible collections
        const student = yield user_1.Student.findById(id);
        const instructor = yield user_1.Instructor.findById(id);
        const admin = yield user_1.Admin.findById(id);
        const user = student || instructor || admin; // Return the first match found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
});
exports.getUser = getUser;
// Update a user by ID
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, email, role } = req.body;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    try {
        // Dynamically select the correct model based on role
        const UserModel = getModelForRole(role);
        // Update the user based on the selected model
        const user = yield UserModel.findByIdAndUpdate(id, { username, email, role }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
});
exports.updateUser = updateUser;
// Delete a user by ID
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    try {
        // Dynamically select the correct model based on the ID
        const student = yield user_1.Student.findByIdAndDelete(id);
        const instructor = yield user_1.Instructor.findByIdAndDelete(id);
        const admin = yield user_1.Admin.findByIdAndDelete(id);
        const user = student || instructor || admin;
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
});
exports.deleteUser = deleteUser;
