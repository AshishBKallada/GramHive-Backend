"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.adValidationRules = {
    addAd: [
        (0, express_validator_1.body)('title').isString().notEmpty().withMessage('Title is required'),
        (0, express_validator_1.body)('description').isString().notEmpty().withMessage('Description is required'),
        (0, express_validator_1.body)('category').isString().notEmpty().withMessage('Category is required'),
        (0, express_validator_1.body)('price').isNumeric().notEmpty().withMessage('Price is required'),
        (0, express_validator_1.body)('images').isArray({ min: 1 }).withMessage('At least one image is required'),
        (0, express_validator_1.body)('images.*.url').isString().notEmpty().withMessage('Image URL is required'),
        (0, express_validator_1.body)('images.*.altText').isString().notEmpty().withMessage('Image alt text is required')
    ],
    confirmPay: [
        (0, express_validator_1.param)('Id').isMongoId().withMessage('Invalid ad ID')
    ]
};
