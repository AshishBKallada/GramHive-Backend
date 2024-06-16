import { body, param } from "express-validator";

export const reportValidationRules = {
  reportContent: [
    body('content').isString().notEmpty().withMessage('Content is required')
  ],
  reportUser: [
    param('Id').isMongoId().withMessage('Invalid user ID'),
    body('category').isString().notEmpty().withMessage('Category is required'),
    body('reason').isString().notEmpty().withMessage('Reason is required')
  ],
  reportPost: [
    param('Id').isMongoId().withMessage('Invalid post ID'),
    body('category').isString().notEmpty().withMessage('Category is required'),
    body('reason').isString().notEmpty().withMessage('Reason is required')
  ],
  reportFeedback: [
    body('postId').isMongoId().withMessage('Invalid post ID'),
    body('reason').isString().notEmpty().withMessage('Reason is required')
  ]
};
