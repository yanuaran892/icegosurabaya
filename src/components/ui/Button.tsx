import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  fullWidth = false,
  icon,
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ice-primary focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-ice-primary text-white hover:bg-ice-dark shadow-sm',
    secondary: 'bg-ice-medium text-ice-dark hover:bg-ice-light shadow-sm',
    outline: 'border border-ice-primary text-ice-primary hover:bg-ice-light',
    ghost: 'text-ice-primary hover:bg-ice-light hover:text-ice-dark',
  };
  
  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };
  
  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <motion.button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${widthStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;