import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Verify API key on startup
const verifyResendConfig = async () => {
  try {
    // Test the API key by sending a simple request
    const { data, error } = await resend.domains.list();
    if (error) {
      console.error('❌ Resend API key validation failed:', error.message);
      return false;
    }
    console.log('✅ Resend API key validated successfully');
    return true;
  } catch (error) {
    console.error('❌ Resend configuration error:', error.message);
    return false;
  }
};

export { resend, verifyResendConfig };