import React from 'react';
import { Send, AlertCircle, Terminal as TerminalIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useContactForm } from '../hooks/useContactForm';
import { useAnimationInView, fadeInUp, staggerContainer } from '../hooks/useAnimation';
import { BlurredText } from './BlurredText';

export function Contact() {
  const { t } = useLanguage();
  const { formData, formStatus, handleSubmit, handleInputChange } = useContactForm();
  const { ref, controls } = useAnimationInView();

  return (
    <motion.div 
      ref={ref}
      id="contact" 
      className="border-t border-green-500/30 py-24"
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold mb-16 font-mono text-green-500 text-center"
          variants={fadeInUp}
        >
          <BlurredText text={`> ${t.contact.title}_`} />
        </motion.h2>

        <motion.div 
          className="max-w-2xl mx-auto"
          variants={fadeInUp}
        >
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            variants={staggerContainer}
          >
            <motion.div 
              className="relative group"
              variants={fadeInUp}
              whileHover={{ x: 10 }}
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-black border border-green-500/30 p-4 text-green-500 font-mono focus:outline-none focus:border-green-500 transition-colors peer"
                placeholder=" "
              />
              <label className="absolute left-4 top-4 text-green-500/50 font-mono transition-all peer-focus:-translate-y-8 peer-focus:text-sm peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-sm">
                &gt; {t.contact.form.name}_
              </label>
            </motion.div>

            <motion.div 
              className="relative group"
              variants={fadeInUp}
              whileHover={{ x: 10 }}
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-black border border-green-500/30 p-4 text-green-500 font-mono focus:outline-none focus:border-green-500 transition-colors peer"
                placeholder=" "
              />
              <label className="absolute left-4 top-4 text-green-500/50 font-mono transition-all peer-focus:-translate-y-8 peer-focus:text-sm peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-sm">
                &gt; {t.contact.form.email}_
              </label>
            </motion.div>

            <motion.div 
              className="relative group"
              variants={fadeInUp}
              whileHover={{ x: 10 }}
            >
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full bg-black border border-green-500/30 p-4 text-green-500 font-mono focus:outline-none focus:border-green-500 transition-colors peer resize-none"
                placeholder=" "
              ></textarea>
              <label className="absolute left-4 top-4 text-green-500/50 font-mono transition-all peer-focus:-translate-y-8 peer-focus:text-sm peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-sm">
                &gt; {t.contact.form.message}_
              </label>
            </motion.div>

            <motion.button
              type="submit"
              disabled={formStatus === 'sending'}
              className={`w-full bg-green-500/20 border border-green-500 p-4 font-mono text-green-500 hover:bg-green-500 hover:text-black transition-all flex items-center justify-center gap-2 ${
                formStatus === 'sending' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {formStatus === 'sending' ? (
                <>
                  <span className="animate-pulse">&gt; {t.contact.form.sending}</span>
                  <div className="animate-spin">
                    <TerminalIcon className="w-5 h-5" />
                  </div>
                </>
              ) : (
                <>
                  {t.contact.form.send}
                  <Send className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* Status Messages */}
            <motion.div 
              className={`transition-all duration-300 ${formStatus === 'idle' ? 'opacity-0' : 'opacity-100'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: formStatus !== 'idle' ? 1 : 0,
                y: formStatus !== 'idle' ? 0 : 20
              }}
            >
              {formStatus === 'success' && (
                <motion.div 
                  className="flex items-center gap-2 text-green-500 font-mono p-4 border border-green-500/30"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                >
                  <TerminalIcon className="w-5 h-5" />
                  {t.contact.form.success}
                </motion.div>
              )}
              {formStatus === 'error' && (
                <motion.div 
                  className="flex items-center gap-2 text-red-500 font-mono p-4 border border-red-500/30"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                >
                  <AlertCircle className="w-5 h-5" />
                  {t.contact.form.error}
                </motion.div>
              )}
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </motion.div>
  );
}