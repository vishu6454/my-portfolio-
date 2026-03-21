import { FaFacebook, FaInstagram, FaWhatsapp, FaLinkedin, FaDownload, FaArrowDown } from "react-icons/fa";
import profileImg from "../assets/profile.jpg";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const { isDark } = useTheme();

  const socialLinks = [
    { icon: FaFacebook, href: "#", color: "from-blue-600 to-blue-400" },
    { icon: FaInstagram, href: "#", color: "from-pink-600 to-purple-400" },
    { icon: FaWhatsapp, href: "#", color: "from-green-600 to-emerald-400" },
    { icon: FaLinkedin, href: "https://linkedin.com/in/vishukanoujiya", color: "from-blue-700 to-cyan-400" }
  ];

  return (
    <section id="home" className={`min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-6 lg:px-8 py-16 lg:py-0 relative overflow-hidden ${
      isDark 
        ? "bg-linear-to-br from-slate-900 via-purple-900 to-emerald-900" 
        : "bg-linear-to-br from-slate-50 via-purple-50 to-emerald-50"
    }`}>
      {/* Background Pattern */}
      <div className={`absolute inset-0 ${
        isDark ? "opacity-10" : "opacity-5"
      }`}>
        <div className="absolute top-20 left-10 w-48 h-48 sm:w-60 sm:h-60 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-80 sm:h-80 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto lg:mx-0 z-10 text-center lg:text-left mt-16 lg:mt-0">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-xl sm:text-2xl font-medium mb-2 ${
            isDark ? "text-emerald-300" : "text-emerald-600"
          }`}
        >
          Hello, I'm
        </motion.h3>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 leading-tight ${
            isDark 
              ? "text-white" 
              : "text-slate-800"
          }`}
        >
          Vishu{" "}
          <span className={`text-transparent bg-linear-to-r ${
            isDark ? "from-emerald-400 to-purple-400" : "from-emerald-600 to-purple-600"
          } bg-clip-text`}>
            Kanoujiya
          </span>
        </motion.h1>

        <div className="h-10 sm:h-12 mb-4">
          <TypeAnimation
            sequence={[
              'Frontend Developer',
              2000,
              'UI/UX Designer',
              2000,
              'React Specialist',
              2000,
              'Creative Coder',
              2000
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className={`text-lg sm:text-xl lg:text-2xl font-semibold ${
              isDark ? "text-purple-200" : "text-purple-700"
            }`}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`mt-4 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          Crafting digital experiences that blend{" "}
          <span className={`font-semibold ${
            isDark ? "text-emerald-300" : "text-emerald-600"
          }`}>
            beautiful design
          </span>{" "}
          with{" "}
          <span className={`font-semibold ${
            isDark ? "text-purple-300" : "text-purple-600"
          }`}>
            cutting-edge technology
          </span>
          . I create responsive, user-centric web applications.
        </motion.p>

        <motion.div 
          className="flex justify-center lg:justify-start gap-4 my-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className={`p-3 rounded-xl bg-linear-to-br ${social.color} shadow-lg hover:shadow-xl transition-all`}
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <social.icon size={20} className="text-white" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.a
            href="/Vishu_Kanoujiya_Resume.pdf"
            download="Vishu_Kanoujiya_Resume.pdf"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload className="text-sm" />
            Download Resume
          </motion.a>
          
          <motion.a
            href="#about"
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border font-semibold transition-all ${
              isDark 
                ? "border-emerald-400/50 text-emerald-300 hover:bg-emerald-400/10 hover:border-emerald-300" 
                : "border-emerald-600/50 text-emerald-700 hover:bg-emerald-600/10 hover:border-emerald-600"
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            Explore Portfolio
            <FaArrowDown className="text-sm" />
          </motion.a>
        </motion.div>
      </div>

      {/* Profile Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative mt-10 lg:mt-0"
      >
        <div className="relative">
          <motion.img
            src={profileImg}
            className={`w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl object-cover border-4 shadow-2xl ${
              isDark ? "border-slate-800/50" : "border-white/50"
            }`}
            alt="Vishu Kanoujiya"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          
          <motion.div
            className={`absolute inset-0 rounded-2xl border-2 z-20 ${
              isDark ? "border-emerald-400/30" : "border-emerald-600/30"
            }`}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden lg:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className={`w-5 h-8 border-2 rounded-full flex justify-center ${
          isDark ? "border-emerald-400/50" : "border-emerald-600/50"
        }`}>
          <motion.div
            className={`w-1 h-2 rounded-full mt-2 ${
              isDark ? "bg-emerald-400" : "bg-emerald-600"
            }`}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}