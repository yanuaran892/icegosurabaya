import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  frosted?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  frosted = false
}) => {
  const baseStyles = 'rounded-xl overflow-hidden';
  const shadowStyles = 'shadow-md hover:shadow-lg transition-shadow duration-300';
  
  const frostedStyles = frosted 
    ? 'bg-white/80 backdrop-blur-sm border border-white/20'
    : 'bg-white';

  return (
    <motion.div 
      className={`${baseStyles} ${shadowStyles} ${frostedStyles} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;