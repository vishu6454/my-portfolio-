import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaFilter, FaStar } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import BuynestImg from "../assets/Buynest.png";
import PortfolioImg from "../assets/portfolio.png";

const projects = [
  {
    title: "Buynest – E-Commerce",
    tech: "React, Tailwind, LocalStorage",
    desc: "Dynamic e-commerce app with filtering, cart, and checkout.",
    img: BuynestImg,
    link: "https://buy-nest-7qijvs91n-vishus-projects-dc2c8cb3.vercel.app/",
    github: "https://github.com/vishu6454/BuyNest-",
    category: "frontend",
    featured: true
  },
  {
    title: "Product Finder",
    tech: "React, Tailwind, REST API",
    desc: "Live API-based product search platform.",
    img: "/assets/productfinder.png",
    link: "#",
    github: "https://github.com/vishu6454/tracyfi",
    category: "frontend",
    featured: true
  },
  {
    title: "Portfolio Website",
    tech: "HTML, CSS, JavaScript",
    desc: "Minimalist portfolio to showcase projects.",
    img: PortfolioImg,
    link: "https://portfolio-omega-three-74.vercel.app/",
    github: "https://github.com/vishu6454/portfolio",
    category: "frontend"
  },
  {
    title: "linear Page",
    tech: "React, Node, Express, MongoDB",
    desc: "Full-stack app with color theme suggestions.",
    img: "/assets/greadian.png",
    link: "#",
    github: "#",
    category: "fullstack"
  }
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const [filter, setFilter] = useState("all");
  const { isDark } = useTheme();

  const categories = [
    { id: "all", name: "All" },
    { id: "frontend", name: "Frontend" },
    { id: "fullstack", name: "Full Stack" },
    { id: "featured", name: "Featured" }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : filter === "featured"
    ? projects.filter(proj => proj.featured)
    : projects.filter(proj => proj.category === filter);

  return (
    <section id="portfolio" className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
      isDark 
        ? "bg-linear-to-br from-slate-900 via-purple-900 to-emerald-900" 
        : "bg-linear-to-br from-slate-50 via-purple-50 to-emerald-50"
    }`}>
      {/* Background Pattern */}
      <div className={`absolute inset-0 ${
        isDark ? "opacity-10" : "opacity-5"
      }`}>
        <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-emerald-500 rounded-full blur-3xl"></div>
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
            Latest <span className="text-transparent bg-linear-to-r from-purple-600 to-emerald-600 bg-clip-text">Projects</span>
          </h2>
          <p className={`text-sm sm:text-base lg:text-lg max-w-2xl mx-auto ${
            isDark ? "text-purple-200" : "text-slate-600"
          }`}>
            A collection of my recent work showcasing my skills in web development and design.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === category.id
                  ? "bg-linear-to-r from-purple-600 to-emerald-600 text-white shadow-md"
                  : isDark
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  : "bg-white text-slate-700 hover:bg-slate-50 shadow-sm"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFilter className="text-xs" />
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.map((proj, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className={`rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all h-full flex flex-col ${
                isDark ? "bg-slate-800" : "bg-white"
              }`}>
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={proj.img} 
                    alt={proj.title}
                    className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-linear-to-t ${
                    isDark ? "from-slate-900/50 to-transparent" : "from-slate-900/30 to-transparent"
                  }`} />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.a
                      href={proj.link}
                      target="_blank"
                      className="p-2 bg-white rounded-xl shadow-md hover:bg-slate-50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaExternalLinkAlt className="text-emerald-600 text-sm" />
                    </motion.a>
                    <motion.a
                      href={proj.github}
                      target="_blank"
                      className="p-2 bg-white rounded-xl shadow-md hover:bg-slate-50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaGithub className="text-slate-800 text-sm" />
                    </motion.a>
                  </div>

                  {/* Featured Badge */}
                  {proj.featured && (
                    <motion.div 
                      className="absolute top-2 left-2 bg-linear-to-r from-amber-500 to-yellow-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md flex items-center gap-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <FaStar className="text-yellow-200 text-xs" />
                      Featured
                    </motion.div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-4 sm:p-5 grow flex flex-col">
                  <h4 className={`font-bold text-base sm:text-lg mb-1.5 ${
                    isDark ? "text-white" : "text-slate-800"
                  }`}>
                    {proj.title}
                  </h4>
                  <p className={`font-medium mb-2 text-xs sm:text-sm ${
                    isDark ? "text-emerald-400" : "text-emerald-600"
                  }`}>
                    {proj.tech}
                  </p>
                  <p className={`text-xs sm:text-sm mb-4 ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}>
                    {proj.desc}
                  </p>
                  
                  <div className="flex gap-2 mt-auto">
                    <motion.a
                      href={proj.link}
                      target="_blank"
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-linear-to-r from-purple-600 to-emerald-600 text-white rounded-xl hover:from-purple-700 hover:to-emerald-700 transition-all text-xs font-medium flex-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt className="text-xs" />
                      Live Demo
                    </motion.a>
                    <motion.a
                      href={proj.github}
                      target="_blank"
                      className={`flex items-center justify-center gap-1.5 px-3 py-2 border rounded-xl transition-all text-xs font-medium flex-1 ${
                        isDark
                          ? "border-slate-600 text-slate-300 hover:bg-slate-700"
                          : "border-slate-300 text-slate-700 hover:bg-slate-50"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub className="text-xs" />
                      Code
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 sm:mt-10"
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-linear-to-r from-purple-600 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Project With Me
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ✨
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}