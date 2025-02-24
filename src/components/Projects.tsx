import React from 'react';
import { Github, Globe, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { usePersonalData } from '../hooks/usePersonalData';
import { useProjectHover } from '../hooks/useProjectHover';
import { useAnimationInView, fadeInUp, staggerContainer } from '../hooks/useAnimation';
import { BlurredText } from './BlurredText';

export function Projects() {
  const { t } = useLanguage();
  const personalData = usePersonalData();
  const { hoveredProject, handleProjectHover } = useProjectHover();
  const { ref, controls } = useAnimationInView();

  return (
    <motion.div 
      ref={ref}
      id="projects" 
      className="py-24 border-t border-green-500/30"
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold mb-16 font-mono text-green-500 text-center"
          variants={fadeInUp}
        >
          <BlurredText text={`> ${t.projects.title}_`} />
        </motion.h2>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
        >
          {personalData.projects.map((project, index) => (
            <motion.div 
              key={index}
              className="group relative border border-green-500/30 overflow-hidden bg-black/50 backdrop-blur-sm"
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              onMouseEnter={() => handleProjectHover(index)}
              onMouseLeave={() => handleProjectHover(null)}
            >
              <div className="aspect-video relative">
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60"
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.6 }}
                  whileHover={{ 
                    scale: 1.1,
                    opacity: 0.3,
                    transition: { duration: 0.6 }
                  }}
                />
                
                <motion.div 
                  className="absolute inset-0 flex flex-col justify-between p-6"
                  initial={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div>
                    <motion.h3 
                      className="text-xl font-mono text-green-500 mb-2 flex items-center gap-2 group-hover:glitch-effect"
                      whileHover={{ x: 10 }}
                    >
                      <span>&gt; {project.title}_</span>
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.span>
                    </motion.h3>
                    <motion.p 
                      className="text-white/80 font-mono text-sm leading-relaxed"
                      initial={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {project.description}
                    </motion.p>
                  </motion.div>
                  
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      variants={staggerContainer}
                    >
                      {project.tech.map((tech, techIndex) => (
                        <motion.span 
                          key={techIndex}
                          className="text-xs font-mono px-2 py-1 border border-green-500/30 text-green-500 backdrop-blur-sm"
                          initial={{ opacity: 1, scale: 1 }}
                          whileHover={{ 
                            scale: 1.1,
                            backgroundColor: 'rgba(34, 197, 94, 0.1)'
                          }}
                          transition={{ delay: techIndex * 0.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                    
                    <motion.div 
                      className="flex gap-4"
                      variants={staggerContainer}
                    >
                      <motion.a 
                        href={project.link} 
                        className="flex items-center gap-2 text-green-500 hover:text-white transition-colors group/link"
                        whileHover={{ x: 5 }}
                      >
                        <Globe className="w-4 h-4" />
                        <span className="text-sm font-mono relative">
                          {t.projects.viewDemo}
                          <motion.span
                            className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover/link:w-full transition-all duration-300"
                            initial={{ width: 0 }}
                            whileHover={{ width: '100%' }}
                          />
                        </span>
                      </motion.a>
                      <motion.a 
                        href="#" 
                        className="flex items-center gap-2 text-green-500 hover:text-white transition-colors group/link"
                        whileHover={{ x: 5 }}
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-sm font-mono relative">
                          {t.projects.viewCode}
                          <motion.span
                            className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover/link:w-full transition-all duration-300"
                            initial={{ width: 0 }}
                            whileHover={{ width: '100%' }}
                          />
                        </span>
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}