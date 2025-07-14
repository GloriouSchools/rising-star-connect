import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, ReactNode } from 'react';

interface AnimatedInViewProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  animation?: 'slideLeft' | 'slideRight' | 'slideUp' | 'slideDown' | 'zoomIn' | 'zoomOut' | 'fadeIn' | 'flipIn' | 'bounceIn';
  delay?: number;
}

const animationVariants: Record<string, Variants> = {
  slideLeft: {
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
    hidden: { opacity: 0, x: -50 }
  },
  slideRight: {
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
    hidden: { opacity: 0, x: 50 }
  },
  slideUp: {
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
    hidden: { opacity: 0, y: 30 }
  },
  slideDown: {
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
    hidden: { opacity: 0, y: -30 }
  },
  zoomIn: {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.68, -0.55, 0.265, 1.55] } },
    hidden: { opacity: 0, scale: 0.8 }
  },
  zoomOut: {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
    hidden: { opacity: 0, scale: 1.2 }
  },
  fadeIn: {
    visible: { opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
    hidden: { opacity: 0 }
  },
  flipIn: {
    visible: { opacity: 1, rotateY: 0, transition: { duration: 0.7, ease: [0.68, -0.55, 0.265, 1.55] } },
    hidden: { opacity: 0, rotateY: -90 }
  },
  bounceIn: {
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.6, 
        type: "spring",
        damping: 10,
        stiffness: 100
      } 
    },
    hidden: { opacity: 0, scale: 0.3 }
  }
};

const defaultVariants: Variants = animationVariants.slideUp;

const AnimatedInView = ({ children, variants, className, animation = 'slideUp', delay = 0 }: AnimatedInViewProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const selectedVariants = variants || animationVariants[animation];

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        controls.start('visible');
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [controls, inView, delay]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={selectedVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedInView; 