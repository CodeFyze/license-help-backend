"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.Instructor = exports.Student = exports.UserRole = void 0;
// user.ts
const mongoose_1 = require("mongoose");
// Enum for user roles
var UserRole;
(function (UserRole) {
    UserRole["Student"] = "student";
    UserRole["Instructor"] = "instructor";
    UserRole["Admin"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
// User schema definition
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: Object.values(UserRole), // Use UserRole here to restrict values
        default: UserRole.Student, // Default value is 'student'
    },
});
// Models for each role, specifying different collections
const Student = (0, mongoose_1.model)("Student", userSchema, "students");
exports.Student = Student;
const Instructor = (0, mongoose_1.model)("Instructor", userSchema, "instructors");
exports.Instructor = Instructor;
const Admin = (0, mongoose_1.model)("Admin", userSchema, "admins");
exports.Admin = Admin;
