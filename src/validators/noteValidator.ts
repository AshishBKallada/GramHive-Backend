import { body, param } from "express-validator";

export const noteValidationRules = {
  addNote: [
    body('note').isString().notEmpty().withMessage('Note content is required')
  ],
  getNote: [],
  removeNote: [],
  getNotes: [],
  addReply: [
    body('noteId').isMongoId().withMessage('Note ID is invalid'),
    body('reply').isString().notEmpty().withMessage('Reply content is required')
  ]
};
