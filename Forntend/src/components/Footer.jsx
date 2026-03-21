import { motion } from "framer-motion";
import { FaHeart, FaReact, FaWind, FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const currentYear = new Date().getFullYear();

  const quickLinks = ['Home', 'About', 'Services', 'Skills', 'Projects', 'Contact'];
  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/vishukanoujiya", color: "from-slate-600 to-slate-800" },
    { icon: FaLinkedin, href: "https://linkedin.com/in/vishukanoujiya", color: "from-blue-600 to-blue-800" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={`py-8 sm:py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
        isDark 
          ? "bg-linear-to-r from-slate-900 to-purple-900" 
          : "bg-linear-to-r from-slate-800 to-purple-800"
      }`}
    >
      {/* Background Pattern */}
      <div className={`absolute inset-0 ${
        isDark ? "opacity-10" : "opacity-5"
      }`}>
        <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 items-center mb-6 sm:mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h3 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent mb-1">
              Vishu Kanoujiya
            </h3>
            <p className="text-slate-300 text-sm">Frontend Developer & Web Designer</p>
            
            {/* Social Links */}
            <motion.div 
              className="flex gap-3 mt-3 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-xl bg-linear-to-br ${social.color} shadow-md hover:shadow-lg transition-all`}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="text-white text-base" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {quickLinks.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-300 hover:text-emerald-300 transition-colors font-medium text-xs sm:text-sm text-center"
                  whileHover={{ scale: 1.1, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center md:items-end gap-3"
          >
            <div className="flex gap-2">
              <motion.div 
                className="flex items-center gap-1.5 px-3 py-2 bg-white/10 rounded-xl backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
              >
                <FaReact className="text-cyan-400 text-sm" />
                <span className="text-slate-300 text-xs">React</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-1.5 px-3 py-2 bg-white/10 rounded-xl backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
              >
                <FaWind className="text-sky-400 text-sm" />
                <span className="text-slate-300 text-xs">Tailwind</span>
              </motion.div>
            </div>
            
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-xl transition-all text-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Top
              <FaArrowUp className="group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="border-t border-slate-700 pt-6 text-center"
        >
          <p className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-slate-400 mb-2 text-xs sm:text-sm">
            Copyright &copy; {currentYear} Vishu Kanoujiya | All Rights Reserved
          </p>
          <p className="flex items-center justify-center gap-1.5 text-slate-500 text-xs">
            Crafted with <FaHeart className="text-red-400" /> using 
            <span className="text-cyan-300">React</span> & 
            <span className="text-sky-300">Tailwind CSS</span>
          </p>
        </motion.div>
      </div>

      {/* Floating Back to Top */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-40 ${
          isDark 
            ? "bg-linear-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700" 
            : "bg-linear-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600"
        } text-white`}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <FaArrowUp className="text-sm" />
      </motion.button>
    </motion.footer>
  );
}