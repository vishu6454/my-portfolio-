// Email template for admin notification
export const getAdminEmailTemplate = (name, email, subject, message, timestamp) => {
  const escapeHtml = (text) => {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  return `
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
          background-color: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #8b5cf6 0%, #10b981 100%);
          color: white;
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          padding: 30px;
        }
        .field {
          margin-bottom: 20px;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 15px;
        }
        .field-label {
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .field-value {
          font-size: 16px;
          color: #1f2937;
          line-height: 1.5;
        }
        .message-content {
          background-color: #f9fafb;
          padding: 15px;
          border-radius: 8px;
          margin-top: 10px;
          border-left: 3px solid #8b5cf6;
          white-space: pre-wrap;
        }
        .footer {
          background-color: #f9fafb;
          padding: 20px;
          text-align: center;
          color: #6b7280;
          font-size: 12px;
          border-top: 1px solid #e5e7eb;
        }
        .badge {
          display: inline-block;
          background-color: #10b981;
          color: white;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }
        a {
          color: #8b5cf6;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📬 New Message Received</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Portfolio Contact Form</p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="field-label">👤 Sender Name</div>
            <div class="field-value"><strong>${escapeHtml(name)}</strong></div>
          </div>
          
          <div class="field">
            <div class="field-label">📧 Email Address</div>
            <div class="field-value">
              <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
            </div>
          </div>
          
          ${subject ? `
          <div class="field">
            <div class="field-label">📝 Subject</div>
            <div class="field-value"><span class="badge">${escapeHtml(subject)}</span></div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="field-label">💬 Message</div>
            <div class="message-content">
              ${escapeHtml(message).replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div class="field">
            <div class="field-label">⏰ Received</div>
            <div class="field-value">${new Date(timestamp).toLocaleString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</div>
          </div>
        </div>
        
        <div class="footer">
          <p>This message was sent from your portfolio website contact form.</p>
          <p>Reply directly to ${escapeHtml(email)} to respond to this inquiry.</p>
          <p style="margin-top: 10px;">© ${new Date().getFullYear()} Portfolio Website</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Email template for auto-reply to user
export const getUserAutoReplyTemplate = (name) => {
  const escapeHtml = (text) => {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting Me!</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #8b5cf6 0%, #10b981 100%);
          color: white;
          padding: 40px 20px;
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
          color: #1f2937;
        }
        .message {
          margin-bottom: 25px;
          color: #4b5563;
        }
        .info-box {
          background-color: #f0fdf4;
          border-left: 4px solid #10b981;
          padding: 15px;
          margin: 20px 0;
          border-radius: 8px;
        }
        .info-box p {
          margin: 5px 0;
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #8b5cf6 0%, #10b981 100%);
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 8px;
          margin-top: 20px;
          font-weight: 600;
        }
        .footer {
          background-color: #f9fafb;
          padding: 20px;
          text-align: center;
          color: #6b7280;
          font-size: 12px;
          border-top: 1px solid #e5e7eb;
        }
        .social-links {
          margin-top: 15px;
        }
        .social-links a {
          color: #8b5cf6;
          text-decoration: none;
          margin: 0 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You! ✨</h1>
          <p style="margin: 10px 0 0 0;">I've received your message</p>
        </div>
        
        <div class="content">
          <div class="greeting">
            Hello ${escapeHtml(name)}!
          </div>
          
          <div class="message">
            <p>Thank you for reaching out to me through my portfolio website. I truly appreciate you taking the time to get in touch.</p>
            <p>I've received your message and will review it carefully. I aim to respond to all inquiries within <strong>24-48 hours</strong> during business days.</p>
          </div>
          
          <div class="info-box">
            <p><strong>📌 What happens next?</strong></p>
            <p>1️⃣ I'll review your message</p>
            <p>2️⃣ I'll get back to you via email</p>
            <p>3️⃣ We'll schedule a conversation if needed</p>
          </div>
          
          <div class="message">
            <p>In the meantime, feel free to:</p>
            <ul style="color: #4b5563;">
              <li>Check out my other work on GitHub</li>
              <li>Connect with me on LinkedIn</li>
              <li>Explore more projects on my portfolio</li>
            </ul>
          </div>
          
          <div style="text-align: center;">
            <a href="https://vishukanoujiya.vercel.app" class="button">Visit Portfolio</a>
          </div>
        </div>
        
        <div class="footer">
          <p>Best regards,<br><strong>Vishu Kanoujiya</strong><br>Frontend Developer & Creative Designer</p>
          <div class="social-links">
            <a href="https://github.com/vishukanoujiya">GitHub</a> •
            <a href="https://linkedin.com/in/vishukanoujiya">LinkedIn</a> •
            <a href="mailto:vishukanoujiya820@gmail.com">Email</a>
          </div>
          <p style="margin-top: 15px;">© ${new Date().getFullYear()} Vishu Kanoujiya | All Rights Reserved</p>
        </div>
      </div>
    </body>
    </html>
  `;
};