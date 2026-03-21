
import { useRef, useState } from 'react';
import { FaDownload, FaPaperPlane, FaCheck, FaSpinner, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Contact() {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

 async function sendEmail(e) {
  e.preventDefault();
  setIsSending(true);

  const formData = new FormData(form.current);

  const data = {
    user_name: formData.get("user_name"),
    user_email: formData.get("user_email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  try {
    const res = await fetch("https://vishuportfolio-backend.onrender.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok && result.success) {
      setIsSent(true);
      form.current.reset();
      setTimeout(() => setIsSent(false), 3000);
    } else {
      alert("❌ Mail send failed");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Server error");
  } finally {
    setIsSending(false);
  }
}



  const contactInfo = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "vishukanoujiya820@gmail.com",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "9766157664",
      color: "from-emerald-500 to-cyan-500"
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "Mumbai, Maharashtra",
      color: "from-blue-500 to-indigo-500"
    }
  ];

  return (
    <section id="contact" className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
      isDark 
        ? "bg-linear-to-br from-slate-900 via-purple-900 to-emerald-900" 
        : "bg-linear-to-br from-slate-50 via-purple-50 to-emerald-50"
    }`}>
      {/* Background Pattern */}
      <div className={`absolute inset-0 ${
        isDark ? "opacity-10" : "opacity-5"
      }`}>
        <div className="absolute top-0 left-0 w-40 h-40 sm:w-64 sm:h-64 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-emerald-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 ${
            isDark ? "text-white" : "text-slate-800"
          }`}>
            Contact <span className="text-transparent bg-linear-to-r from-purple-600 to-emerald-600 bg-clip-text">Me</span>
          </h2>
          <p className={`text-sm sm:text-base lg:text-lg max-w-2xl mx-auto ${
            isDark ? "text-purple-200" : "text-slate-600"
          }`}>
            Let's work together to bring your ideas to life. Get in touch and let's start something amazing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            <h3 className={`text-xl sm:text-2xl font-bold mb-4 ${
              isDark ? "text-white" : "text-slate-800"
            }`}>
              Get In Touch
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index}
                  className={`flex items-center gap-3 p-4 rounded-xl shadow-md hover:shadow-lg transition-all ${
                    isDark ? "bg-slate-800/50" : "bg-white"
                  }`}
                  whileHover={{ x: 5, scale: 1.02 }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className={`p-3 rounded-xl bg-linear-to-r ${info.color} shadow-md`}>
                    <info.icon className="text-white text-base" />
                  </div>
                  <div>
                    <p className={`text-xs sm:text-sm ${
                      isDark ? "text-purple-200" : "text-slate-600"
                    }`}>
                      {info.label}
                    </p>
                    <p className={`font-semibold text-sm sm:text-base ${
                      isDark ? "text-white" : "text-slate-800"
                    }`}>
                      {info.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Resume Download */}
            <motion.a
              href="/vk.pdf"
              download
              className={`inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl border font-medium transition-all ${
                isDark 
                  ? "border-emerald-400/50 text-emerald-300 hover:bg-emerald-400/10 hover:border-emerald-300" 
                  : "border-emerald-600/50 text-emerald-700 hover:bg-emerald-600/10 hover:border-emerald-600"
              }`}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
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
            className={`p-5 sm:p-6 rounded-2xl shadow-xl border ${
              isDark 
                ? "bg-slate-800/50 border-slate-700/50" 
                : "bg-white border-slate-200"
            }`}
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <motion.div whileHover={{ scale: 1.02 }}>
                <input 
                  type="text" 
                  name="user_name" 
                  placeholder="Full Name" 
                  className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all ${
                    isDark 
                      ? "bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400" 
                      : "bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-500 focus:border-emerald-400"
                  }`}
                  required
                />
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }}>
                <input 
                  type="email" 
                  name="user_email" 
                  placeholder="Email Address" 
                  className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all ${
                    isDark 
                      ? "bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400" 
                      : "bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-500 focus:border-emerald-400"
                  }`}
                  required
                />
              </motion.div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} className="mb-4">
              <input 
                type="text" 
                name="subject" 
                placeholder="Subject" 
                className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all ${
                  isDark 
                    ? "bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400" 
                    : "bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-500 focus:border-emerald-400"
                }`}
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="mb-6">
              <textarea 
                name="message" 
                placeholder="Your message..." 
                rows="4"
                className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all resize-none ${
                  isDark 
                    ? "bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400" 
                    : "bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-500 focus:border-emerald-400"
                }`}
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSending || isSent}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                isSent 
                  ? "bg-green-500 text-white" 
                  : isSending
                  ? "bg-slate-400 text-white cursor-not-allowed" 
                  : "bg-linear-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white"
              } shadow-md hover:shadow-lg`}
              whileHover={!isSending && !isSent ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isSending && !isSent ? { scale: 0.98 } : {}}
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
              
              {isSending ? "Sending..." : isSent ? "Message Sent!" : "Send Message"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}