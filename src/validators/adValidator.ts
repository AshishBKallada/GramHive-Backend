import { body, param } from "express-validator";

export const adValidationRules = {
  addAd: [
    body('title').isString().notEmpty().withMessage('Title is required'),
    body('description').isString().notEmpty().withMessage('Description is required'),
    body('category').isString().notEmpty().withMessage('Category is required'),
    body('price').isNumeric().notEmpty().withMessage('Price is required'),
    body('images').isArray({ min: 1 }).withMessage('At least one image is required'),
    body('images.*.url').isString().notEmpty().withMessage('Image URL is required'),
    body('images.*.altText').isString().notEmpty().withMessage('Image alt text is required')
  ],
  confirmPay: [
    param('Id').isMongoId().withMessage('Invalid ad ID')
  ]
};
