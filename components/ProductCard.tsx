import React from 'react';
import { Plus } from 'lucide-react';
import { Bike } from '../types';
import { motion } from 'framer-motion';
import Button from './ui/Button';

interface ProductCardProps {
  bike: Bike;
  onAddToCart: (bike: Bike) => void;
  onClick?: (bike: Bike) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ bike, onAddToCart, onClick }) => {
  const isOutOfStock = bike.stock === 0;
  const isLowStock = bike.stock > 0 && bike.stock < 5;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      onClick={() => onClick && onClick(bike)}
      className={`group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full relative cursor-pointer ${isOutOfStock ? 'opacity-80' : ''}`}
    >
      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
        <motion.img 
          src={bike.image} 
          alt={bike.name} 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className={`w-full h-full object-cover object-center ${isOutOfStock ? 'grayscale' : ''}`}
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-forest-900 shadow-sm">
          {bike.category}
        </div>
        
        {/* Quick view hint overlay */}
        <div className="absolute inset-0 bg-forest-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="bg-white/90 backdrop-blur text-forest-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {isOutOfStock ? 'View Details' : 'Quick View'}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-display font-bold text-forest-900 mb-2 leading-tight group-hover:text-accent-500 transition-colors">{bike.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">{bike.description}</p>
        
        <div className="mb-4 text-xs font-bold uppercase tracking-wider">
           {isOutOfStock ? (
             <span className="text-red-500 bg-red-50 px-2 py-1 rounded">Out of Stock</span>
           ) : isLowStock ? (
             <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded">Only {bike.stock} Left</span>
           ) : (
             <span className="text-green-600 bg-green-50 px-2 py-1 rounded">In Stock: {bike.stock}</span>
           )}
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-2xl font-bold text-forest-800">€{bike.price.toLocaleString()}</span>
          
          <motion.button 
            whileHover={!isOutOfStock ? { scale: 1.1, backgroundColor: "#f97316" } : {}}
            whileTap={!isOutOfStock ? { scale: 0.9 } : {}}
            onClick={(e) => {
              e.stopPropagation(); 
              if (!isOutOfStock) onAddToCart(bike);
            }}
            disabled={isOutOfStock}
            className={`p-3 rounded-full transition-colors shadow-md z-10 ${
                isOutOfStock 
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                : 'bg-forest-900 text-white hover:bg-accent-500'
            }`}
            aria-label="Add to Cart"
          >
            <Plus size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;