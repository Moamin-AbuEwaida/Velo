import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  as?: 'input' | 'select' | 'textarea';
  options?: string[]; // For select
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  className = '', 
  as = 'input',
  options,
  children,
  ...props 
}) => {
  const baseStyles = "w-full p-3 bg-white text-forest-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none transition-all placeholder-gray-400 disabled:bg-gray-50 disabled:text-gray-400";
  const errorStyles = error ? "border-red-500 focus:ring-red-500" : "";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-bold text-forest-900 mb-2">
          {label}
        </label>
      )}
      
      {as === 'select' ? (
        <select className={`${baseStyles} ${errorStyles} ${className}`} {...props as any}>
           {children}
        </select>
      ) : as === 'textarea' ? (
        <textarea className={`${baseStyles} ${errorStyles} ${className}`} {...props as any} />
      ) : (
        <input className={`${baseStyles} ${errorStyles} ${className}`} {...props as any} />
      )}

      {error && (
        <p className="text-red-500 text-xs mt-1 font-medium flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;