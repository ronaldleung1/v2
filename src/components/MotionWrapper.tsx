import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface MotionWrapperProps {
  children: ReactNode;
  animation?: "fadeUp" | "fadeIn" | "slideUp" | "slideIn";
  delay?: number;
  className?: string;
  hoverAnimation?: "lift" | "scale" | "none";
}

export default function MotionWrapper({ 
  children, 
  animation = "fadeIn", 
  delay = 0,
  className = "",
  hoverAnimation = "none"
}: MotionWrapperProps) {
  
  const animations = {
    fadeUp: {
      initial: {
        opacity: 0,
        y: 20,
        filter: 'blur(10px)'
      },
      animate: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      },
      transition: { duration: 1, delay, type: "spring" }
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6, delay }
    },
    
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay }
    },
    slideIn: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.5, delay }
    }
  };

  const selectedAnimation = animations[animation];
  
  // Define hover animations
  const getHoverProps = () => {
    switch (hoverAnimation) {
      case "lift":
        return {
          whileHover: { 
            y: -4,
            transition: { 
              type: "spring", 
              stiffness: 300, 
              damping: 15 
            }
          },
          transition: {
            y: {
              type: "spring",
              stiffness: 500,
              damping: 25
            }
          }
        };
      case "scale":
        return {
          whileHover: { 
            scale: 1.02, 
            transition: { 
              type: "spring", 
              stiffness: 400, 
              damping: 20 
            }
          },
          transition: {
            scale: {
              type: "spring",
              stiffness: 600,
              damping: 30
            }
          }
        };
      default:
        return {};
    }
  };
  
  return (
    <motion.div
      {...selectedAnimation}
      {...getHoverProps()}
      className={className}
    >
      {children}
    </motion.div>
  );
} 