import { useRef, useState, useEffect } from 'react';
import { 
  FaDownload, FaPaperPlane, FaCheck, FaSpinner, FaPhone, 
  FaEnvelope, FaMapMarkerAlt, FaClock, FaShieldAlt, FaGithub,
  FaLinkedin, FaTwitter, FaInstagram, FaExclamationTriangle
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { toast, Toaster } from 'react-hot-toast';

export default function Contact() {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [backendStatus, setBackendStatus] = useState(null);
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  // API URL - Make sure this matches your backend
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  
  // Log the API URL for debugging
  console.log('API URL:', API_URL);

  // Check backend connection on component mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(`${API_URL}/health`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          setBackendStatus('connected');
          console.log('✅ Backend is connected');
        } else {
          setBackendStatus('error');
          console.log('❌ Backend responded with error');
        }
      } catch (err) {
        setBackendStatus('disconnected');
        console.error('❌ Cannot connect to backend:', err);
        toast.error('Cannot connect to server. Please make sure the backend is running on port 5000');
      }
    };
    
    checkBackend();
  }, [API_URL]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.user_name.trim()) {
      newErrors.user_name = 'Name is required';
    } else if (formData.user_name.length < 2) {
      newErrors.user_name = 'Name must be at least 2 characters';
    } else if (formData.user_name.length > 100) {
      newErrors.user_name = 'Name cannot exceed 100 characters';
    }
    
    if (!formData.user_email.trim()) {
      newErrors.user_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      newErrors.user_email = 'Please enter a valid email address';
    }
    
    if (formData.subject && formData.subject.length > 200) {
      newErrors.subject = 'Subject cannot exceed 200 characters';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.length > 5000) {
      newErrors.message = 'Message cannot exceed 5000 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  async function sendEmail(e) {
    e.preventDefault();
    
    // Check backend connection first
    if (backendStatus !== 'connected') {
      const errorMsg = 'Cannot connect to server. Please make sure the backend is running on port 5000';
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSending(true);
    setError(null);

    try {
      console.log('Sending to:', `${API_URL}/contact`);
      console.log('Data:', formData);
      
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', res.status);
      const result = await res.json();
      console.log('Response data:', result);

      if (res.ok && result.success) {
        setIsSent(true);
        setFormData({
          user_name: '',
          user_email: '',
          subject: '',
          message: ''
        });
        toast.success('Message sent successfully! I\'ll get back to you soon.');
        
        setTimeout(() => setIsSent(false), 3000);
      } else {
        const errorMsg = result.message || result.errors?.[0]?.msg || 'Failed to send message. Please try again.';
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error("Error sending message:", err);
      let errorMsg = 'Network error. ';
      
      if (err.message === 'Failed to fetch') {
        errorMsg += 'Cannot connect to backend server. ';
        errorMsg += 'Make sure the backend is running on port 5000. ';
        errorMsg += 'Check if CORS is properly configured.';
      } else {
        errorMsg += err.message;
      }
      
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsSending(false);
    }
  }

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "vishukanoujiya820@gmail.com",
      color: "from-purple-500 to-pink-500",
      link: "mailto:vishukanoujiya820@gmail.com",
      description: "Send me an email anytime"
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "+91 97661 57664",
      color: "from-emerald-500 to-cyan-500",
      link: "tel:9766157664",
      description: "Mon-Fri, 9AM-6PM IST"
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "Mumbai, Maharashtra",
      color: "from-blue-500 to-indigo-500",
      link: null,
      description: "Available for remote work"
    }
  ];

  const socialLinks = [
    { icon: FaGithub, label: "GitHub", link: "https://github.com/vishukanoujiya", color: "hover:bg-gray-800" },
    { icon: FaLinkedin, label: "LinkedIn", link: "https://linkedin.com/in/vishukanoujiya", color: "hover:bg-blue-600" },
    { icon: FaTwitter, label: "Twitter", link: "https://twitter.com/yourusername", color: "hover:bg-blue-400" },
    { icon: FaInstagram, label: "Instagram", link: "https://instagram.com/yourusername", color: "hover:bg-pink-600" }
  ];

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDark ? '#1f2937' : '#fff',
            color: isDark ? '#fff' : '#000',
            borderRadius: '12px',
          },
        }}
      />
      
      <section id="contact" className={`py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
        isDark 
          ? "bg-linear-to-br from-slate-900 via-purple-900 to-emerald-900" 
          : "bg-linear-to-br from-slate-50 via-purple-50 to-emerald-50"
      }`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 ${
              isDark ? "text-white" : "text-slate-800"
            }`}>
              Let's <span className="text-transparent bg-linear-to-r from-purple-600 to-emerald-600 bg-clip-text">Connect</span>
            </h2>
            <p className={`text-base sm:text-lg lg:text-xl max-w-2xl mx-auto ${
              isDark ? "text-purple-200" : "text-slate-600"
            }`}>
              Have a project in mind? I'd love to hear about it. Get in touch and let's create something amazing together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Backend Status Indicator */}
              {backendStatus === 'disconnected' && (
                <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 text-sm">
                  <FaExclamationTriangle className="inline-block mr-2" />
                  Backend server is not connected. Please start the backend server on port 5000.
                </div>
              )}
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div 
                    key={index}
                    className={`flex items-start gap-4 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isDark ? "bg-slate-800/50 backdrop-blur-sm" : "bg-white"
                    }`}
                    whileHover={{ x: 8, scale: 1.02 }}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className={`p-3 rounded-xl bg-linear-to-r ${info.color} shadow-md`}>
                      <info.icon className="text-white text-xl" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold mb-1 ${
                        isDark ? "text-purple-300" : "text-purple-600"
                      }`}>
                        {info.label}
                      </p>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className={`text-base sm:text-lg font-semibold hover:underline block ${
                            isDark ? "text-white" : "text-slate-800"
                          }`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className={`text-base sm:text-lg font-semibold ${
                          isDark ? "text-white" : "text-slate-800"
                        }`}>
                          {info.value}
                        </p>
                      )}
                      <p className={`text-xs sm:text-sm mt-1 ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}>
                        {info.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="pt-4"
              >
                <h3 className={`text-lg font-semibold mb-4 ${
                  isDark ? "text-white" : "text-slate-800"
                }`}>
                  Connect with me
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl bg-white/10 backdrop-blur-sm transition-all duration-300 ${social.color} hover:scale-110 hover:text-white`}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="text-xl" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className={`flex items-center gap-3 p-4 rounded-xl ${
                  isDark ? "bg-emerald-500/10" : "bg-emerald-50"
                }`}
              >
                <FaClock className="text-emerald-500 text-lg" />
                <div>
                  <p className={`text-sm font-semibold ${
                    isDark ? "text-emerald-300" : "text-emerald-700"
                  }`}>
                    Available for work
                  </p>
                  <p className={`text-xs ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}>
                    Usually responds within 24 hours
                  </p>
                </div>
              </motion.div>

              <motion.a
                href="/Vishu_Kanoujiya_Resume.pdf"
                download
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-300 w-full sm:w-auto ${
                  isDark 
                    ? "border-emerald-400/50 text-emerald-300 hover:bg-emerald-400/10 hover:border-emerald-300" 
                    : "border-emerald-600/50 text-emerald-700 hover:bg-emerald-600/10 hover:border-emerald-600"
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 }}
              >
                <FaDownload />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              ref={form}
              onSubmit={sendEmail}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`p-6 sm:p-8 rounded-2xl shadow-xl border backdrop-blur-sm ${
                isDark 
                  ? "bg-slate-800/30 border-slate-700/50" 
                  : "bg-white/80 border-slate-200"
              }`}
            >
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <input 
                    type="text" 
                    name="user_name" 
                    value={formData.user_name}
                    onChange={handleInputChange}
                    placeholder="Full Name *" 
                    className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all ${
                      errors.user_name ? 'border-red-500 ring-2 ring-red-500' : ''
                    } ${
                      isDark 
                        ? "bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400" 
                        : "bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-500 focus:border-emerald-400"
                    }`}
                    required
                  />
                  {errors.user_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.user_name}</p>
                  )}
                </div>
                
                <div>
                  <input 
                    type="email" 
                    name="user_email" 
                    value={formData.user_email}
                    onChange={handleInputChange}
                    placeholder="Email Address *" 
                    className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all ${
                      errors.user_email ? 'border-red-500 ring-2 ring-red-500' : ''
                    } ${
                      isDark 
                        ? "bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400" 
                        : "bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-500 focus:border-emerald-400"
                    }`}
                    required
                  />
                  {errors.user_email && (
                    <p className="text-red-500 text-xs mt-1">{errors.user_email}</p>
                  )}
                </div>
              </div>

              <div className="mb-5">
                <input 
                  type="text" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject (Optional)" 
                  className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all ${
                    errors.subject ? 'border-red-500 ring-2 ring-red-500' : ''
                  } ${
                    isDark 
                      ? "bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400" 
                      : "bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-500 focus:border-emerald-400"
                  }`}
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                )}
              </div>

              <div className="mb-5">
                <textarea 
                  name="message" 
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message *" 
                  rows="5"
                  className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all resize-none ${
                    errors.message ? 'border-red-500 ring-2 ring-red-500' : ''
                  } ${
                    isDark 
                      ? "bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400" 
                      : "bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-500 focus:border-emerald-400"
                  }`}
                  required
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
                <div className="flex justify-end mt-1">
                  <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {formData.message.length}/5000 characters
                  </span>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/50 text-red-500 text-sm flex items-center gap-2"
                  >
                    <FaShieldAlt className="text-sm shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={isSending || isSent || backendStatus === 'disconnected'}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isSent 
                    ? "bg-green-500 text-white" 
                    : isSending
                    ? "bg-slate-400 text-white cursor-not-allowed" 
                    : backendStatus === 'disconnected'
                    ? "bg-slate-500 text-white cursor-not-allowed"
                    : "bg-linear-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white"
                } shadow-lg hover:shadow-xl`}
                whileHover={!isSending && !isSent && backendStatus !== 'disconnected' ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isSending && !isSent && backendStatus !== 'disconnected' ? { scale: 0.98 } : {}}
              >
                <AnimatePresence mode="wait">
                  {isSending ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <FaSpinner className="animate-spin" />
                    </motion.div>
                  ) : isSent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <FaCheck />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <FaPaperPlane />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {isSending ? "Sending..." : isSent ? "Message Sent!" : backendStatus === 'disconnected' ? "Server Not Connected" : "Send Message"}
              </motion.button>

              <p className={`text-xs text-center mt-4 ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}>
                <FaShieldAlt className="inline-block mr-1 text-emerald-500" />
                Your information is secure and will never be shared
              </p>
            </motion.form>
          </div>
        </div>
      </section>
    </>
  );
}