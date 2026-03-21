import { resend } from '../config/resendConfig.js';
import { getAdminEmailTemplate, getUserAutoReplyTemplate } from '../utils/emailTemplates.js';
import { validationResult } from 'express-validator';

export const sendContactEmail = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
        message: 'Validation failed'
      });
    }

    const { user_name, user_email, subject, message } = req.body;
    const timestamp = new Date();

    // Create a clean, formatted email HTML with Name, Email, Subject, and Message
    const adminEmailHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }
          .header p {
            margin: 10px 0 0;
            opacity: 0.9;
            font-size: 14px;
          }
          .content {
            padding: 30px;
          }
          .field {
            margin-bottom: 25px;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 15px;
          }
          .field-label {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            color: #667eea;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
          }
          .field-value {
            font-size: 16px;
            color: #333;
            font-weight: 500;
            word-wrap: break-word;
          }
          .message-content {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #667eea;
            margin-top: 5px;
            white-space: pre-wrap;
            font-family: monospace;
            font-size: 14px;
          }
          .badge {
            display: inline-block;
            background-color: #e3f2fd;
            color: #1976d2;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
          }
          .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 12px;
            border-top: 1px solid #e0e0e0;
          }
          .timestamp {
            color: #999;
            font-size: 12px;
            margin-top: 20px;
            text-align: center;
          }
          @media (max-width: 600px) {
            .content {
              padding: 20px;
            }
            .field-value {
              font-size: 14px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📬 New Contact Form Submission</h1>
            <p>You have received a new message from your portfolio website</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="field-label">👤 NAME</div>
              <div class="field-value">
                <strong>${escapeHtml(user_name)}</strong>
              </div>
            </div>
            
            <div class="field">
              <div class="field-label">📧 EMAIL</div>
              <div class="field-value">
                <a href="mailto:${escapeHtml(user_email)}" style="color: #667eea; text-decoration: none;">
                  ${escapeHtml(user_email)}
                </a>
              </div>
            </div>
            
            <div class="field">
              <div class="field-label">📝 SUBJECT</div>
              <div class="field-value">
                <span class="badge">${subject ? escapeHtml(subject) : 'No Subject'}</span>
              </div>
            </div>
            
            <div class="field">
              <div class="field-label">💬 MESSAGE</div>
              <div class="message-content">
                ${escapeHtml(message).replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div class="timestamp">
              Received: ${new Date(timestamp).toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Reply to this message</strong><br>
            Simply reply to this email to respond to ${escapeHtml(user_name)}</p>
            <p style="margin-top: 10px; font-size: 11px;">
              This email was sent from your portfolio website contact form.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Admin email data with the formatted HTML
    const adminEmailData = {
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: `📬 New Contact: ${user_name} - ${subject || 'No Subject'}`,
      html: adminEmailHTML,
      replyTo: user_email,
    };

    // User auto-reply email (simplified version)
    const userAutoReplyHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting Me</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
          }
          .content {
            padding: 30px;
          }
          .greeting {
            font-size: 20px;
            margin-bottom: 20px;
            color: #333;
          }
          .message-details {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .message-details p {
            margin: 5px 0;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 20px;
            font-weight: 600;
          }
          .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You! ✨</h1>
            <p>I've received your message</p>
          </div>
          
          <div class="content">
            <div class="greeting">
              Hello ${escapeHtml(user_name)}!
            </div>
            
            <p>Thank you for reaching out to me through my portfolio website. I appreciate you taking the time to get in touch.</p>
            
            <div class="message-details">
              <p><strong>Your message details:</strong></p>
              <p><strong>Subject:</strong> ${subject ? escapeHtml(subject) : 'No Subject'}</p>
              <p><strong>Message:</strong> ${escapeHtml(message).substring(0, 100)}${message.length > 100 ? '...' : ''}</p>
            </div>
            
            <p>I've received your message and will review it carefully. I aim to respond to all inquiries within <strong>24-48 hours</strong> during business days.</p>
            
            <div style="text-align: center;">
              <a href="https://vishukanoujiya.vercel.app" class="button">Visit My Portfolio</a>
            </div>
          </div>
          
          <div class="footer">
            <p>Best regards,<br><strong>Vishu Kanoujiya</strong><br>Frontend Developer</p>
            <p style="margin-top: 10px;">© ${new Date().getFullYear()} Vishu Kanoujiya | All Rights Reserved</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const userAutoReplyData = {
      from: process.env.FROM_EMAIL,
      to: user_email,
      subject: 'Thank you for contacting Vishu Kanoujiya! ✨',
      html: userAutoReplyHTML,
    };

    // Send both emails in parallel for efficiency
    const [adminEmail, autoReplyEmail] = await Promise.allSettled([
      resend.emails.send(adminEmailData),
      resend.emails.send(userAutoReplyData)
    ]);

    // Check results
    const adminSuccess = adminEmail.status === 'fulfilled' && !adminEmail.value?.error;
    const autoReplySuccess = autoReplyEmail.status === 'fulfilled' && !autoReplyEmail.value?.error;

    // Prepare response
    const response = {
      success: adminSuccess,
      message: adminSuccess 
        ? 'Message sent successfully! I\'ll get back to you soon.' 
        : 'Message received but there was an issue with email delivery.',
    };

    // Add detailed info if there were issues
    if (!adminSuccess) {
      response.details = {
        adminError: adminEmail.status === 'fulfilled' ? adminEmail.value?.error?.message : 'Email service unavailable',
      };
      console.error('❌ Admin email failed:', response.details.adminError);
    } else {
      console.log('✅ Admin email sent successfully to:', process.env.TO_EMAIL);
    }

    if (!autoReplySuccess) {
      response.details = {
        ...response.details,
        autoReplyError: autoReplyEmail.status === 'fulfilled' ? autoReplyEmail.value?.error?.message : 'Auto-reply failed',
      };
      console.error('❌ Auto-reply failed:', response.details.autoReplyError);
    } else {
      console.log('✅ Auto-reply email sent successfully to:', user_email);
    }

    // Even if auto-reply fails, we still consider the message as received
    res.status(adminSuccess ? 200 : 207).json(response);
    
  } catch (error) {
    console.error('❌ Error in sendContactEmail:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Helper function to escape HTML
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Optional: Get contact stats (for admin dashboard)
export const getContactStats = async (req, res) => {
  // This is a placeholder for future enhancement
  // You could add database integration here to track contact submissions
  res.status(200).json({
    success: true,
    message: 'Stats endpoint - Add database integration for real statistics',
    stats: {
      totalSubmissions: 0,
      lastSubmission: null
    }
  });
};