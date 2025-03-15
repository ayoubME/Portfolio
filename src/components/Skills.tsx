import React from 'react';
import { Laptop, BookOpen, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { usePersonalData } from '../hooks/usePersonalData';
import { useAnimationInView, fadeInUp, staggerContainer } from '../hooks/useAnimation';
import { BlurredText } from './BlurredText';

export function Skills() {
  const { t } = useLanguage();
  const personalData = usePersonalData();
  const { ref, controls } = useAnimationInView();

  return (
    <motion.div
      ref={ref}
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
          <BlurredText text={`> ${t.skills.title}_`} />
        </motion.h2>

        <motion.div className="grid md:grid-cols-3 gap-12" variants={staggerContainer}>
          <motion.div
            className="border border-green-500/30 p-8 hover:bg-green-500/5 transition-all text-center"
            variants={fadeInUp}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <motion.div
              className="w-16 h-16 border border-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Laptop className="w-8 h-8 text-green-500" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-4 font-mono text-center">
              &gt; {t.skills.frontend}_
            </h3>
            <p className="text-green-400 font-mono text-center">
              {personalData.skills.frontend.join(', ')}
            </p>
          </motion.div>

          <motion.div
            className="border border-green-500/30 p-8 hover:bg-green-500/5 transition-all text-center"
            variants={fadeInUp}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <motion.div
              className="w-16 h-16 border border-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <BookOpen className="w-8 h-8 text-green-500" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-4 font-mono text-center">
              &gt; {t.skills.backend}_
            </h3>
            <p className="text-green-400 font-mono text-center">
              {personalData.skills.backend.join(', ')}
            </p>
          </motion.div>

          <motion.div
            className="border border-green-500/30 p-8 hover:bg-green-500/5 transition-all text-center"
            variants={fadeInUp}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <motion.div
              className="w-16 h-16 border border-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Coffee className="w-8 h-8 text-green-500" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-4 font-mono text-center">
              &gt; {t.skills.tools}_
            </h3>
            <p className="text-green-400 font-mono text-center">
              {personalData.skills.tools.join(', ')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
