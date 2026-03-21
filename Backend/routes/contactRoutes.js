import express from 'express';
import { body } from 'express-validator';
import { sendContactEmail, getContactStats } from '../controllers/contactController.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting specifically for contact form
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 contact form submissions per hour
  message: {
    success: false,
    message: 'Too many messages sent from this IP. Please try again in an hour.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation rules
const contactValidation = [
  body('user_name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s\-']+$/).withMessage('Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('user_email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Subject cannot exceed 200 characters')
    .escape(),
  
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 5000 }).withMessage('Message must be between 10 and 5000 characters')
    .escape(),
];

// Routes
router.post('/', contactLimiter, contactValidation, sendContactEmail);
router.get('/stats', getContactStats);

// Optional: Test route to verify Resend configuration
router.get('/test', async (req, res) => {
  try {
    const testEmail = {
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: 'Test Email from Portfolio Backend',
      html: '<p>This is a test email to verify Resend configuration.</p><p>If you\'re receiving this, the email service is working correctly!</p>',
    };
    
    const { data, error } = await resend.emails.send(testEmail);
    
    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
    
    res.status(200).json({ success: true, message: 'Test email sent successfully', data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;