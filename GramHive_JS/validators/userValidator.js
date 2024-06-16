"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.userValidationRules = {
    login: [
        (0, express_validator_1.body)('username').isString().notEmpty().withMessage('Username is required'),
        (0, express_validator_1.body)('password').isLength({ min: 6 }).isString().notEmpty().withMessage('Password is required')
    ],
    signup: [
        (0, express_validator_1.body)('email').isEmail().withMessage('Email is invalid'),
        (0, express_validator_1.body)('name').isString().notEmpty().withMessage('Name is required'),
        (0, express_validator_1.body)('username').isString().notEmpty().withMessage('Username is required'),
        (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        (0, express_validator_1.body)('image').optional().isURL().withMessage('Image must be a valid URL')
    ],
    checkEmail: [
        (0, express_validator_1.body)('email').isEmail().withMessage('Email is invalid')
    ],
    sendMail: [
        (0, express_validator_1.body)('email').isEmail().withMessage('Email is invalid')
    ],
    resendMail: [
        (0, express_validator_1.param)('emailId').isEmail().withMessage('Email ID is invalid')
    ],
    verifyOTP: [
        (0, express_validator_1.body)('otp').isString().notEmpty().withMessage('OTP is required')
    ],
    searchUser: [
        (0, express_validator_1.param)('query').isString().notEmpty().withMessage('Query is required')
    ],
    getSearchUser: [
        (0, express_validator_1.param)('userId').isMongoId().withMessage('User ID is invalid')
    ],
    updateLocation: [
        (0, express_validator_1.body)('latitude').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a valid number between -90 and 90'),
        (0, express_validator_1.body)('longitude').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a valid number between -180 and 180')
    ]
};
