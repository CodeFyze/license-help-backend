"use strict";
// import { Router } from 'express';
// import { register , login } from '../controllers/authController';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = Router();
// router.post('/register', register);
// router.post('/login', login);
// export default router;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// Multer configuration
const upload = (0, multer_1.default)();
// Routes
router.post('/register', upload.none(), authController_1.register); // Handle `multipart/form-data` for text fields
router.post('/login', authController_1.login); // No special handling for `login`
exports.default = router;
