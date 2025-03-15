import { motion } from 'framer-motion';

interface BlurredTextProps {
  text: string;
  className?: string;
}

export function BlurredText({ text, className = '' }: BlurredTextProps) {
  const letters = Array.from(text);

  return (
    <div className={`flex overflow-hidden ${className}`}>
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
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  );
}
