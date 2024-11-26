"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const jwt_1 = require("../config/jwt");
const router = (0, express_1.Router)();
router.get('/', jwt_1.verifyToken, userController_1.getUsers); // Admin-only access to view users
router.get('/:id', jwt_1.verifyToken, userController_1.getUser); // Admin or user access to view a specific user
router.put('/:id', jwt_1.verifyToken, userController_1.updateUser); // Admin or user access to update a user
router.delete('/:id', jwt_1.verifyToken, userController_1.deleteUser); // Admin-only access to delete users
exports.default = router;
