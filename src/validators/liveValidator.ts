import { body, param } from "express-validator";

export const liveValidationRules = {
  addLive: [
    body('liveStreamData').isObject().withMessage('Live stream data must be an object'),
    body('liveStreamData.title').isString().notEmpty().withMessage('Title is required'),
    body('liveStreamData.description').isString().notEmpty().withMessage('Description is required'),
    body('liveStreamData.startTime').isISO8601().toDate().withMessage('Invalid start time format'),
    body('liveStreamData.endTime').isISO8601().toDate().withMessage('Invalid end time format')
  ],
  removeLive: [
    param('userId').isMongoId().withMessage('Invalid user ID')
  ]
};
