import React from 'react';
import { User, Code2, MapPin, Mail, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { usePersonalData } from '../hooks/usePersonalData';
import { useAnimationInView, fadeInUp, slideIn, scaleIn } from '../hooks/useAnimation';
import { BlurredText } from './BlurredText';
import { CVDownloadButton } from '../utils/cvGenerator';
import Profile from '../assets/Profile.jpeg'

export function About() {
  const { t, language } = useLanguage();
  const personalData = usePersonalData();
  const { ref, controls } = useAnimationInView();

  return (
    <motion.div 
      ref={ref}
      id="profile" 
      className="py-24 border-t border-green-500/30"
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold mb-16 font-mono text-green-500 text-center"
          variants={fadeInUp}
        >
          <BlurredText text={`> ${t.about.title}_`} />
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="relative"
            variants={scaleIn}
          >
            <div className="aspect-square rounded-lg overflow-hidden border border-green-500/30">
              <motion.img 
                src={Profile}
                alt="Profile"
                className="w-full h-full object-cover brightness-75"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="absolute inset-0 border-4 border-green-500/30"></div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div 
              className="space-y-4"
              variants={slideIn}
            >
              <motion.div 
                className="flex items-center gap-3 text-xl font-mono"
                whileHover={{ x: 10 }}
              >
                <User className="w-6 h-6 text-green-500" />
                <span className="text-green-500">&gt; name_</span>
                <span className="text-white">{personalData.name}</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3 text-xl font-mono"
                whileHover={{ x: 10 }}
              >
                <Code2 className="w-6 h-6 text-green-500" />
                <span className="text-green-500">&gt; role_</span>
                <span className="text-white">{personalData.role}</span>
              </motion.div>

              <motion.div 
                className="flex items-center gap-3 text-xl font-mono"
                whileHover={{ x: 10 }}
              >
                <MapPin className="w-6 h-6 text-green-500" />
                <span className="text-green-500">&gt; location_</span>
                <span className="text-white">{personalData.location}</span>
              </motion.div>

              <motion.div 
                className="flex items-center gap-3 text-xl font-mono"
                whileHover={{ x: 10 }}
              >
                <Mail className="w-6 h-6 text-green-500" />
                <span className="text-green-500">&gt; email_</span>
                <span className="text-white">{personalData.email}</span>
              </motion.div>
            </motion.div>

            <motion.div 
              className="space-y-4"
              variants={fadeInUp}
            >
              <h3 className="text-xl font-mono text-green-500 text-center">&gt; bio_</h3>
              <p className="text-white/80 font-mono leading-relaxed">
                {personalData.bio}
              </p>
              <motion.div 
                className="flex gap-4"
                variants={fadeInUp}
              >
                <motion.div 
                  className="border border-green-500/30 p-4 flex-1 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-mono text-green-500 mb-2">{personalData.stats.experience}+</div>
                  <div className="text-white/80 font-mono">{t.about.stats.experience}</div>
                </motion.div>
                <motion.div 
                  className="border border-green-500/30 p-4 flex-1 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-mono text-green-500 mb-2">{personalData.stats.projects}+</div>
                  <div className="text-white/80 font-mono">{t.about.stats.projects}</div>
                </motion.div>
              </motion.div>

              <motion.div
                className="w-full mt-6 bg-green-500/20 hover:bg-green-500 text-green-500 hover:text-black border border-green-500 p-4 font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5" />
                <CVDownloadButton language={language} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}