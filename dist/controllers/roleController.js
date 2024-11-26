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
exports.assignRole = void 0;
const user_1 = require("../models/user"); // Import models and UserRole enum
// Helper function to assign role
const assignRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = req.body;
    // Check if the provided role is valid
    if (!Object.values(user_1.UserRole).includes(role)) {
        return res.status(400).json({ message: 'Invalid role provided' });
    }
    try {
        // Check for existing user by ID
        let user;
        if (role === user_1.UserRole.Student) {
            user = yield user_1.Student.findById(userId);
        }
        else if (role === user_1.UserRole.Instructor) {
            user = yield user_1.Instructor.findById(userId);
        }
        else if (role === user_1.UserRole.Admin) {
            user = yield user_1.Admin.findById(userId);
        }
        // If the user is not found in the appropriate collection
        if (!user) {
            return res.status(404).json({ message: 'User not found in the specified role collection' });
        }
        // Update the role for the user
        user.role = role;
        yield user.save();
        // Respond with the updated user information
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error assigning role' });
    }
});
exports.assignRole = assignRole;
