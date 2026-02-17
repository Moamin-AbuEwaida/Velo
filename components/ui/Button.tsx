import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import BikeLoader from '../BikeLoader';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  icon, 
  children, 
  className = '',
  disabled,
  ...props 
}) => {
  
  // Base styles
  const baseStyles = "rounded-full font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm relative overflow-hidden";
  
  // Variant styles
  const variants = {
    primary: "bg-forest-900 text-white hover:bg-accent-500 hover:shadow-accent-500/30 border border-transparent",
    secondary: "bg-white text-forest-900 hover:bg-forest-50 border border-forest-100",
    outline: "bg-transparent border-2 border-forest-900 text-forest-900 hover:bg-forest-900 hover:text-white",
    ghost: "bg-transparent text-forest-900 hover:bg-forest-50 hover:text-accent-500 shadow-none",
    danger: "bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 border border-transparent"
  };

  // Size styles
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base md:text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${(disabled || isLoading) ? 'opacity-70 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <BikeLoader small />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {children}
          {icon && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </motion.button>
  );
};

export default Button;