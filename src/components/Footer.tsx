import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { usePersonalData } from '../hooks/usePersonalData';
import { fadeInUp } from '../hooks/useAnimation';

export function Footer() {
  const { t } = useLanguage();
  const personalData = usePersonalData();

  return (
    <motion.footer
      className="border-t border-green-500/30 py-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <motion.div className="max-w-7xl mx-auto px-4 text-center" whileHover={{ scale: 1.05 }}>
        <p className="font-mono text-green-500/70">
          &copy; {new Date().getFullYear()} {personalData.name}. {t.footer.rights}
        </p>
      </motion.div>
    </motion.footer>
  );
}
