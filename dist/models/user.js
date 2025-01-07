"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
const mongoose_1 = require("mongoose");
// Define possible user roles
var UserRole;
(function (UserRole) {
    UserRole["Student"] = "student";
    UserRole["Instructor"] = "instructor";
    UserRole["Admin"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
// Create the User schema with role-based fields
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.Student },
    // Instructor-specific fields (conditionally required based on the role)
    firstName: { type: String, required: function () { return this.role === UserRole.Instructor; } },
    surname: { type: String, required: function () { return this.role === UserRole.Instructor; } },
    phone: { type: String, required: function () { return this.role === UserRole.Instructor; } },
    postcode: { type: String, required: function () { return this.role === UserRole.Instructor; } },
    transmission: { type: String, enum: ["Automatic", "Manual"], required: function () { return this.role === UserRole.Instructor; }, default: "Automatic" },
    subject: { type: String, required: function () { return this.role === UserRole.Instructor; }, default: "" },
    message: { type: String, required: function () { return this.role === UserRole.Instructor; } },
    // attachments: { type: [Buffer], required: function() { return this.role === UserRole.Instructor; }, default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
// Model for the User schema
exports.User = (0, mongoose_1.model)("User", userSchema);
