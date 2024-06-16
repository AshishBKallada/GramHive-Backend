import { body } from "express-validator";

export const notificationValidationRules = {
  updateNotifications: [
    body('notificationIds').isArray({ min: 1 }).withMessage('At least one notification ID is required')
  ]
};
