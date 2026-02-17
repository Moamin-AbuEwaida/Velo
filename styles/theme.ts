import { Variants } from "framer-motion";

// --- Colors ---
// Useful for Javascript-driven styling (like Charts) where CSS classes can't be used directly
export const THEME_COLORS = {
  forest: {
    500: '#10b981',
    800: '#065f46',
    900: '#044e43',
    950: '#022c22',
  },
  accent: {
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
  },
  chart: {
    primary: '#044e43',
    secondary: '#10b981',
    grid: '#e5e7eb',
    text: '#6b7280'
  }
};

// --- Animations ---
// Centralized Framer Motion variants for consistent site-wide motion

export const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const FADE_IN: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export const STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const SCALE_ON_HOVER = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

export const SLIDE_IN_RIGHT: Variants = {
  hidden: { x: 50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.5 } 
  }
};
