"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Route to get all users
router.get('/', userController_1.getUsers); // GET /api/users
// Route to get a single user by ID
router.get('/:id', userController_1.getUser); // GET /api/users/:id
// Route to update user details
router.put('/:id', userController_1.updateUser); // PUT /api/users/:id
// Route to delete a user
router.delete('/:id', userController_1.deleteUser); // DELETE /api/users/:id
// Route to assign a role to a user
router.post('/assign-role', userController_1.assignRole); // POST /api/users/assign-role
exports.default = router;
