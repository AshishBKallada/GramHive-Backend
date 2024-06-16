"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liveValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.liveValidationRules = {
    addLive: [
        (0, express_validator_1.body)('liveStreamData').isObject().withMessage('Live stream data must be an object'),
        (0, express_validator_1.body)('liveStreamData.title').isString().notEmpty().withMessage('Title is required'),
        (0, express_validator_1.body)('liveStreamData.description').isString().notEmpty().withMessage('Description is required'),
        (0, express_validator_1.body)('liveStreamData.startTime').isISO8601().toDate().withMessage('Invalid start time format'),
        (0, express_validator_1.body)('liveStreamData.endTime').isISO8601().toDate().withMessage('Invalid end time format')
    ],
    removeLive: [
        (0, express_validator_1.param)('userId').isMongoId().withMessage('Invalid user ID')
    ]
};
