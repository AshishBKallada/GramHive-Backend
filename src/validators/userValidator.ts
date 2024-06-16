import { body, param } from "express-validator";

export const userValidationRules = {
  login: [
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).isString().notEmpty().withMessage('Password is required')
  ],
  signup: [
    body('email').isEmail().withMessage('Email is invalid'),
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('image').optional().isURL().withMessage('Image must be a valid URL')
  ],
  checkEmail: [
    body('email').isEmail().withMessage('Email is invalid')
  ],
  sendMail: [
    body('email').isEmail().withMessage('Email is invalid')
  ],
  resendMail: [
    param('emailId').isEmail().withMessage('Email ID is invalid')
  ],
  verifyOTP: [
    body('otp').isString().notEmpty().withMessage('OTP is required')
  ],
  searchUser: [
    param('query').isString().notEmpty().withMessage('Query is required')
  ],
  getSearchUser: [
    param('userId').isMongoId().withMessage('User ID is invalid')
  ],
  updateLocation: [
    body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a valid number between -90 and 90'),
    body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a valid number between -180 and 180')
  ]
};