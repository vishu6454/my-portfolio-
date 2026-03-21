import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#portfolio" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-200/50 dark:border-slate-700/50" 
          : "bg-linear-to-r from-purple-600 to-emerald-600 dark:from-purple-900 dark:to-emerald-900"
      }`}
    >
      {/* Logo */}
      <motion.a 
        href="#home" 
        className="font-bold text-2xl sm:text-3xl bg-linear-to-r from-emerald-600 to-purple-600 dark:from-emerald-300 dark:to-purple-300 bg-clip-text text-transparent"
        whileHover={{ scale: 1.05 }}
      >
        VK.
      </motion.a>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-4">
        {navItems.map((item, index) => (
          <motion.a
            key={item.name}
            href={item.href}
            className={`relative text-sm font-medium px-3 py-2 transition-colors ${
              scrolled 
                ? "text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400" 
                : "text-white hover:text-emerald-300"
            }`}
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {item.name}
            <motion.span
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 ${
                scrolled ? "bg-linear-to-r from-emerald-600 to-purple-600" : "bg-emerald-300"
              }`}
              whileHover={{ width: "80%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        ))}
        
        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className={`ml-2 p-2 rounded-xl transition-all ${
            scrolled 
              ? "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700" 
              : "bg-white/20 hover:bg-white/30"
          }`}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? (
            <FaSun className="text-yellow-400 text-lg" />
          ) : (
            <FaMoon className="text-purple-100 text-lg" />
          )}
        </motion.button>
      </nav>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 lg:hidden">
        <motion.button
          onClick={toggleTheme}
          className={`p-2 rounded-xl ${
            scrolled 
              ? "bg-slate-100 dark:bg-slate-800" 
              : "bg-white/20"
          }`}
          whileTap={{ scale: 0.9 }}
        >
          {isDark ? (
            <FaSun className="text-yellow-400 text-lg" />
          ) : (
            <FaMoon className="text-purple-100 text-lg" />
          )}
        </motion.button>
        
        <motion.button 
          className={`z-50 ${scrolled ? "text-slate-700 dark:text-slate-300" : "text-white"}`}
          onClick={() => setNavOpen(!navOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {navOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {navOpen && (
          <motion.nav
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-0 right-0 h-screen w-64 bg-white dark:bg-slate-900 backdrop-blur-md lg:hidden flex flex-col pt-20 px-6 gap-4 shadow-2xl border-l border-slate-200 dark:border-slate-700 z-40"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="py-3 text-base font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors border-b border-slate-100 dark:border-slate-800"
                onClick={() => setNavOpen(false)}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}