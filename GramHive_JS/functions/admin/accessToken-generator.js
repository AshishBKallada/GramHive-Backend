"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminTokenGenerator = void 0;
const jwt = require('jsonwebtoken');
const adminTokenGenerator = (Id) => {
    return jwt.sign({ Id }, 'nagato-pain', { expiresIn: '1d' });
};
exports.adminTokenGenerator = adminTokenGenerator;
