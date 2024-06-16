"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.reportValidationRules = {
    reportContent: [
        (0, express_validator_1.body)('content').isString().notEmpty().withMessage('Content is required')
    ],
    reportUser: [
        (0, express_validator_1.param)('Id').isMongoId().withMessage('Invalid user ID'),
        (0, express_validator_1.body)('category').isString().notEmpty().withMessage('Category is required'),
        (0, express_validator_1.body)('reason').isString().notEmpty().withMessage('Reason is required')
    ],
    reportPost: [
        (0, express_validator_1.param)('Id').isMongoId().withMessage('Invalid post ID'),
        (0, express_validator_1.body)('category').isString().notEmpty().withMessage('Category is required'),
        (0, express_validator_1.body)('reason').isString().notEmpty().withMessage('Reason is required')
    ],
    reportFeedback: [
        (0, express_validator_1.body)('postId').isMongoId().withMessage('Invalid post ID'),
        (0, express_validator_1.body)('reason').isString().notEmpty().withMessage('Reason is required')
    ]
};
