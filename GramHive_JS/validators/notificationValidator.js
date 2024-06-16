"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.notificationValidationRules = {
    updateNotifications: [
        (0, express_validator_1.body)('notificationIds').isArray({ min: 1 }).withMessage('At least one notification ID is required')
    ]
};
