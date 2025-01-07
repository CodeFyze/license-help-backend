"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignRole = void 0;
const user_1 = require("../models/user");
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
