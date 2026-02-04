import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="section-padding min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating Decorative Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-1/4 w-32 h-32 border border-white/10 rounded-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-white/10 rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 rounded-full border border-white/20 text-xs tracking-[0.2em] uppercase text-gray-400">
                About Me
              </span>
            </motion.div>

            <h2 className="heading-lg mb-6">
              Passionate About{" "}
              <span className="text-gradient">Full-Stack Development</span>
            </h2>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                I'm a MERN stack developer specializing in building modern,
                scalable web applications. With expertise in MongoDB,
                Express.js, React, and Node.js, I create end-to-end solutions
                that solve real-world problems.
              </p>
              <p>
                My approach combines clean code practices, responsive design,
                and performance optimization to deliver applications that not
                only look great but perform exceptionally. From RESTful APIs to
                dynamic user interfaces, I handle every aspect of web
                development.
              </p>
              <p>
                When I'm not coding, I enjoy exploring new technologies,
                contributing to open-source projects, and collaborating with
                fellow developers to push the boundaries of what's possible on
                the web.
              </p>
            </div>

            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-8 px-8 py-4 rounded-full bg-white text-black font-medium text-sm tracking-wide"
            >
              View My Projects
            </motion.a>
          </motion.div>

          {/* Right Column - Skills & Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Main Tech Stack Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="glass-hover rounded-3xl p-8"
            >
              <h3 className="text-xl font-display font-semibold mb-6">
                Core Technologies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "MongoDB", desc: "Database" },
                  { name: "Express.js", desc: "Backend" },
                  { name: "React.js", desc: "Frontend" },
                  { name: "Node.js", desc: "Runtime" },
                ].map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="glass rounded-2xl p-4 text-center"
                  >
                    <div className="text-lg font-semibold mb-1">
                      {tech.name}
                    </div>
                    <div className="text-xs text-gray-500">{tech.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Additional Skills */}
            <motion.div
              whileHover={{ y: -4 }}
              className="glass-hover rounded-3xl p-8"
            >
              <h3 className="text-xl font-display font-semibold mb-6">
                Additional Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "RESTful APIs",
                  "JWT Auth",
                  "Redux",
                  "Git & GitHub",
                  "Responsive Design",
                  "Tailwind CSS",
                  "Cloudinary",
                  "Deployment",
                ].map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-4 py-2 rounded-full glass text-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-white mb-1">4+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Personal Projects
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">2+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Years of Practice
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">∞</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Learning Mindset
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
