import profileImg from "../assets/profile.jpg";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaCode, FaPalette, FaRocket, FaUsers } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const { isDark } = useTheme();

  const qualities = [
    { icon: FaCode, text: "Innovative Thinker", color: "from-purple-500 to-pink-500" },
    { icon: FaPalette, text: "Detail-Oriented Designer", color: "from-emerald-500 to-cyan-500" },
    { icon: FaUsers, text: "Team Player", color: "from-blue-500 to-indigo-500" },
    { icon: FaRocket, text: "Customer-Centric", color: "from-orange-500 to-red-500" }
  ];

  const stats = [
    { number: "Fresher", label: "Experience", linear: "from-purple-500 to-pink-500" },
    { number: "50+", label: "Projects", linear: "from-emerald-500 to-green-500" },
    { number: "10+", label: "Happy Clients", linear: "from-blue-500 to-cyan-500" },
    { number: "15+", label: "Technologies", linear: "from-orange-500 to-yellow-500" }
  ];

  return (
    <section id="about" className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
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

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        {/* Image Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative mx-auto max-w-sm">
            <motion.img 
              src={profileImg} 
              className={`w-full rounded-2xl shadow-xl mx-auto border-4 ${
                isDark ? "border-slate-800" : "border-white"
              }`}
              alt="About Vishu"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            
            {/* Floating elements */}
            <motion.div
              className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 bg-linear-to-r from-purple-600 to-pink-600 text-white p-3 sm:p-4 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <div className="text-lg sm:text-xl font-bold">Fresher</div>
              <div className="text-purple-100 text-xs">Experience</div>
            </motion.div>

            <motion.div
              className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-linear-to-r from-emerald-600 to-cyan-600 text-white p-3 sm:p-4 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0, rotate: 45 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.7, type: "spring" }}
            >
              <div className="text-lg sm:text-xl font-bold">50+</div>
              <div className="text-emerald-100 text-xs">Projects</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2 
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 ${
              isDark ? "text-white" : "text-slate-800"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            ABOUT <span className="text-transparent bg-linear-to-r from-purple-600 to-emerald-600 bg-clip-text">Me</span>
          </motion.h2>
          
          <motion.h3 
            className={`text-lg sm:text-xl lg:text-2xl font-semibold mb-4 ${
              isDark ? "text-purple-400" : "text-purple-600"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Frontend Developer | Creative Designer | Tech Innovator
          </motion.h3>

          <motion.p 
            className={`text-sm sm:text-base mb-6 leading-relaxed ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            I'm passionate about creating digital experiences that are not only visually 
            stunning but also highly functional and user-friendly. With a keen eye for 
            design and a love for clean code, I specialize in turning complex problems 
            into simple, beautiful solutions.
          </motion.p>

          {/* Qualities Grid */}
          <motion.div 
            className="grid grid-cols-2 gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            {qualities.map((quality, index) => (
              <motion.div 
                key={index}
                className={`flex items-center gap-3 p-3 rounded-xl shadow-md hover:shadow-lg transition-all ${
                  isDark ? "bg-slate-800" : "bg-white"
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.03, x: 5 }}
              >
                <div className={`p-2 rounded-lg bg-linear-to-r ${quality.color} transition-transform`}>
                  <quality.icon className="text-white text-sm" />
                </div>
                <span className={`text-xs sm:text-sm font-medium ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}>{quality.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`p-3 rounded-xl text-center shadow-md hover:shadow-lg transition-all ${
                  isDark ? "bg-slate-800" : "bg-white"
                }`}
                whileHover={{ scale: 1.05, y: -3 }}
              >
                <div className={`text-lg sm:text-xl font-bold bg-linear-to-r ${stat.linear} bg-clip-text text-transparent`}>
                  {stat.number}
                </div>
                <div className={`text-xs ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.a 
            href="#services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-purple-600 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
          >
            Explore My Services
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}