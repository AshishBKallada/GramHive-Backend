import { body, param } from "express-validator";

export const storyValidationRules = {
  uploadStory: [
    param('userId').isMongoId().withMessage('Invalid user ID'),
    body('file').custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Story file is required');
      }
      return true;
    })
  ]
};
