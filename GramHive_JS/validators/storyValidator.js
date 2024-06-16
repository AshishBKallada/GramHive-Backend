"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storyValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.storyValidationRules = {
    uploadStory: [
        (0, express_validator_1.param)('userId').isMongoId().withMessage('Invalid user ID'),
        (0, express_validator_1.body)('file').custom((value, { req }) => {
            if (!req.file) {
                throw new Error('Story file is required');
            }
            return true;
        })
    ]
};
