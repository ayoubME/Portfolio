import React from 'react';
import { Building, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { usePersonalData } from '../hooks/usePersonalData';
import { useAnimationInView, fadeInUp, staggerContainer } from '../hooks/useAnimation';
import { BlurredText } from './BlurredText';

export function Experience() {
  const { t } = useLanguage();
  const personalData = usePersonalData();
  const { ref, controls } = useAnimationInView();

  return (
    <motion.div
      ref={ref}
      id="experience"
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
          <BlurredText text={`> ${t.experience.title}_`} />
        </motion.h2>

        <motion.div className="space-y-12" variants={staggerContainer}>
          {Object.entries(personalData.experience.roles).map(([key, role], index) => (
            <motion.div
              key={key}
              className="group relative border border-green-500/30 p-6 hover:bg-green-500/5 transition-all duration-500"
              variants={fadeInUp}
              custom={index}
              whileHover={{ x: 20, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="absolute top-0 left-0 w-2 h-full bg-green-500/30"
                initial={{ height: '0%' }}
                animate={{ height: '100%' }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              />
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <motion.div
                  className="flex-shrink-0 w-16 h-16 border border-green-500 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Building className="w-8 h-8 text-green-500" />
                </motion.div>
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <motion.h3
                      className="text-xl font-mono text-green-500 text-center md:text-left"
                      whileHover={{ x: 10 }}
                    >
                      {role.title} {t.experience.at} {role.company}
                    </motion.h3>
                    <div className="flex items-center gap-2 text-green-400/70 font-mono">
                      <Calendar className="w-4 h-4" />
                      <span>{role.period}</span>
                    </div>
                  </div>
                  <p className="text-white/80 font-mono mb-4">{role.description}</p>
                  <motion.div className="flex flex-wrap gap-2" variants={staggerContainer}>
                    {role.technologies &&
                      role.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className="px-3 py-1 text-sm font-mono border border-green-500/30 text-green-500 hover:bg-green-500/10 transition-colors"
                          whileHover={{ scale: 1.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
