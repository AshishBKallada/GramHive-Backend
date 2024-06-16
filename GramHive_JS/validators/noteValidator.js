"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.noteValidationRules = {
    addNote: [
        (0, express_validator_1.body)('note').isString().notEmpty().withMessage('Note content is required')
    ],
    getNote: [],
    removeNote: [],
    getNotes: [],
    addReply: [
        (0, express_validator_1.body)('noteId').isMongoId().withMessage('Note ID is invalid'),
        (0, express_validator_1.body)('reply').isString().notEmpty().withMessage('Reply content is required')
    ]
};
