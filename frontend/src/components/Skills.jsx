import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact,
  FaNodeJs, FaGitAlt, FaGithub, FaBootstrap
} from "react-icons/fa";
import {
  SiTailwindcss, SiMongodb, SiExpress,
  SiNextdotjs, SiTypescript, SiRedux, SiVite
} from "react-icons/si";

const SKILLS = [
  {
    title: "Frontend",
    items: [
      { name: "HTML", icon: FaHtml5, level: 95, color: "from-orange-500 to-red-500" },
      { name: "CSS", icon: FaCss3Alt, level: 90, color: "from-blue-500 to-indigo-500" },
      { name: "JavaScript", icon: FaJs, level: 88, color: "from-yellow-400 to-yellow-600" },
      { name: "React", icon: FaReact, level: 85, color: "from-cyan-400 to-blue-500" },
      { name: "Tailwind", icon: SiTailwindcss, level: 92, color: "from-teal-400 to-cyan-500" },
    ]
  },
  {
    title: "Backend & Tools",
    items: [
      { name: "Node.js", icon: FaNodeJs, level: 80, color: "from-green-500 to-emerald-600" },
      { name: "Express", icon: SiExpress, level: 75, color: "from-gray-600 to-gray-800" },
      { name: "MongoDB", icon: SiMongodb, level: 70, color: "from-green-600 to-green-800" },
      { name: "Git", icon: FaGitAlt, level: 85, color: "from-orange-600 to-red-600" },
      { name: "GitHub", icon: FaGithub, level: 90, color: "from-gray-800 to-black" },
    ]
  },
  {
    title: "Libraries & Frameworks",
    items: [
      { name: "TypeScript", icon: SiTypescript, level: 75, color: "from-blue-600 to-blue-800" },
      { name: "Next.js", icon: SiNextdotjs, level: 70, color: "from-gray-700 to-gray-900" },
      { name: "Redux", icon: SiRedux, level: 78, color: "from-purple-600 to-violet-800" },
      { name: "Bootstrap", icon: FaBootstrap, level: 85, color: "from-purple-500 to-indigo-700" },
      { name: "Vite", icon: SiVite, level: 88, color: "from-purple-500 to-pink-500" },
    ]
  }
];

export default function Skills() {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      className={`relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden
        ${isDark
          ? "bg-linear-to-br from-slate-900 via-purple-900 to-emerald-900"
          : "bg-linear-to-br from-slate-50 via-purple-50 to-emerald-50"
        }`}
    >
      {/* Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-60 h-60 bg-purple-500/30 blur-3xl rounded-full" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-emerald-500/30 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl lg:text-5xl font-bold mb-3 ${
            isDark ? "text-white" : "text-slate-800"
          }`}>
            My <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-emerald-500">Skills</span>
          </h2>
          <p className={`${isDark ? "text-slate-300" : "text-slate-600"} max-w-xl mx-auto`}>
            Tools & technologies I use to build fast, modern and scalable web apps.
          </p>
        </motion.div>

        {/* Skill Groups */}
        <div className="space-y-12">
          {SKILLS.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2 }}
            >
              <h3 className={`text-xl font-semibold mb-6 ${
                isDark ? "text-emerald-300" : "text-emerald-600"
              }`}>
                {group.title}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {group.items.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ y: -6, scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.25 + idx * 0.1 }}
                    className={`relative group rounded-2xl p-4 backdrop-blur-xl border
                      ${isDark
                        ? "bg-slate-800/40 border-white/10"
                        : "bg-white/60 border-slate-200"
                      }`}
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-3
                      bg-linear-to-br ${skill.color} shadow-lg`}>
                      <skill.icon className="text-white text-2xl" />
                    </div>

                    <h4 className={`font-semibold text-sm ${
                      isDark ? "text-white" : "text-slate-800"
                    }`}>
                      {skill.name}
                    </h4>

                    <span className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-lg
                      ${isDark ? "bg-black/40 text-emerald-300" : "bg-emerald-100 text-emerald-700"}`}>
                      {skill.level}%
                    </span>

                    {/* Glow on hover */}
                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition
                      bg-linear-to-br ${skill.color} blur-xl -z-10`} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className={`mt-16 rounded-2xl p-6 backdrop-blur-xl
            ${isDark ? "bg-slate-800/50" : "bg-white/60"}`}
        >
          <h4 className={`text-xl font-bold mb-2 ${
            isDark ? "text-white" : "text-slate-800"
          }`}>
            Always Learning 🚀
          </h4>
          <p className={`${isDark ? "text-slate-300" : "text-slate-600"} mb-4`}>
            Improving performance, architecture & modern React patterns.
          </p>

          <div className="flex flex-wrap gap-2">
            {["Next.js 14", "Advanced React", "GraphQL", "AWS"].map((tech, i) => (
              <span
                key={tech}
                className={`px-3 py-1 rounded-xl text-xs font-medium
                  ${isDark
                    ? "bg-slate-700 text-emerald-300"
                    : "bg-emerald-100 text-emerald-700"
                  }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
