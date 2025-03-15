import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';

export function useTypingEffect(text: string, speed: number = 100) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return displayedText;
}

export function useAnimationInView(threshold = 0.2) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return { ref, controls, inView };
}

export function useProjectHover() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const handleProjectHover = (index: number | null) => {
    setHoveredProject(index);
  };

  return {
    hoveredProject,
    handleProjectHover,
  };
}
