import React from 'react';
import { motion } from 'framer-motion';

interface BikeLoaderProps {
  small?: boolean;
  className?: string;
}

const BikeLoader: React.FC<BikeLoaderProps> = ({ small = false, className = '' }) => {
  // Use currentColor if small (inherits from button text), otherwise use brand green
  const primaryColor = small ? "currentColor" : "#044e43";
  const accentColor = "#f97316";

  const BikeAnimation = () => (
    <svg 
      width={small ? "45" : "120"} 
      height={small ? "30" : "80"} 
      viewBox="0 0 120 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      {/* Back Wheel */}
      <motion.g
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        style={{ originX: "25px", originY: "60px" }}
      >
        <circle cx="25" cy="60" r="18" stroke={primaryColor} strokeWidth="3" />
        <path d="M25 42 L25 78 M7 60 L43 60" stroke={primaryColor} strokeWidth="1.5" />
        <path d="M12.27 47.27 L37.73 72.73 M12.27 72.73 L37.73 47.27" stroke={primaryColor} strokeWidth="1.5" />
      </motion.g>

      {/* Front Wheel */}
      <motion.g
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        style={{ originX: "95px", originY: "60px" }}
      >
        <circle cx="95" cy="60" r="18" stroke={primaryColor} strokeWidth="3" />
        <path d="M95 42 L95 78 M77 60 L113 60" stroke={primaryColor} strokeWidth="1.5" />
        <path d="M82.27 47.27 L107.73 72.73 M82.27 72.73 L107.73 47.27" stroke={primaryColor} strokeWidth="1.5" />
      </motion.g>

      {/* Frame */}
      <path 
        d="M25 60 L45 25 L85 25 L95 60" 
        stroke={primaryColor}
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M45 25 L55 60 L25 60" 
        stroke={primaryColor}
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path d="M55 60 L85 25" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Seat & Handlebars */}
      <path d="M45 25 L40 18 M35 18 L45 18" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" />
      <path d="M85 25 L85 15 M78 15 L92 15" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" />

      {/* Pedal Gear - Keep accent color even in small mode for pop */}
      <circle cx="55" cy="60" r="6" fill={accentColor} />
      <motion.g
         initial={{ rotate: 0 }}
         animate={{ rotate: 360 }}
         transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
         style={{ originX: "55px", originY: "60px" }}
      >
         <line x1="55" y1="60" x2="55" y2="70" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
         <circle cx="55" cy="70" r="2" fill={accentColor} />
      </motion.g>
    </svg>
  );

  if (small) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <BikeAnimation />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-forest-50 flex flex-col items-center justify-center">
      <div className="relative scale-150">
        <BikeAnimation />
        
        {/* Speed Lines - Only in full screen */}
        <motion.div 
            className="absolute top-1/2 -right-8 -translate-y-1/2 flex flex-col gap-2"
        >
            <motion.div 
              className="w-12 h-1 bg-gray-200 rounded-full" 
              animate={{ x: [-20, 0, -20], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "linear", delay: 0.1 }}
            />
            <motion.div 
              className="w-8 h-1 bg-gray-200 rounded-full" 
              animate={{ x: [-20, 0, -20], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "linear", delay: 0.3 }}
            />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-center"
      >
        <h2 className="text-forest-900 font-display font-bold uppercase tracking-widest text-2xl">VeloVibe</h2>
        <motion.p 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-accent-500 font-bold text-sm mt-2"
        >
          Preparing your ride...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default BikeLoader;