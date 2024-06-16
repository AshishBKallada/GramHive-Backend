import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    name: string;
    status?: number;
}

const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
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

export default errorHandler;
