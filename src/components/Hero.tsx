import React from 'react';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { usePersonalData } from '../hooks/usePersonalData';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { fadeInUp, staggerContainer } from '../hooks/useAnimation';

const BlurredText = ({ text }: { text: string }) => {
  const letters = Array.from(text);
  
  return (
    <div className="flex overflow-hidden">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: index * 0.1,
            ease: [0.17, 0.67, 0.83, 0.67],
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
};

export function Hero() {
  const { t } = useLanguage();
  const personalData = usePersonalData();
  const displayedText = useTypingEffect(t.hero.title);

  return (
    <motion.div 
      id="accueil"
      className="relative min-h-screen pt-16 flex items-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div 
          className="max-w-2xl"
          variants={staggerContainer}
        >
          <motion.div 
            className="font-mono mb-6 text-xl"
            variants={fadeInUp}
          >
            {displayedText}
            <span className="animate-pulse">_</span>
          </motion.div>
          <motion.div 
            className="text-5xl font-bold mb-6 font-mono glitch-effect"
            variants={fadeInUp}
          >
            <BlurredText text={personalData.name} />
          </motion.div>
          <motion.div 
            className="text-xl mb-8 text-green-400 font-mono"
            variants={fadeInUp}
          >
            <BlurredText text={personalData.role} />
          </motion.div>
          <motion.div 
            className="flex gap-4"
            variants={fadeInUp}
          >
            <motion.a 
              href="#contact" 
              className="bg-green-500/20 hover:bg-green-500 text-green-500 hover:text-black px-8 py-3 border border-green-500 font-mono flex items-center gap-2 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.hero.cta.contact}
              <Mail className="w-5 h-5" />
            </motion.a>
            <motion.a 
              href="#projects" 
              className="bg-black/50 hover:bg-black text-green-500 px-8 py-3 border border-green-500 font-mono"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.hero.cta.projects}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}