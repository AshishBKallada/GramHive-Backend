"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    switch (err.name) {
        case 'ValidationError':
            res.status(err.status || 400).json({ error: err.message });
            break;
        case 'UnauthorizedError':
            res.status(err.status || 401).json({ error: 'Unauthorized' });
            break;
        default:
            res.status(err.status || 500).json({ error: 'Internal Server Error' });
            break;
    }
};
exports.default = errorHandler;
