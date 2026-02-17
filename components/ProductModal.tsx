import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Check, AlertTriangle, Box, Ruler, Weight } from 'lucide-react';
import { Bike } from '../types';

interface ProductModalProps {
  bike: Bike | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (bike: Bike) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ bike, isOpen, onClose, onAddToCart }) => {
  if (!bike) return null;

  // Stock status logic
  const isLowStock = bike.stock > 0 && bike.stock < 5;
  const isOutOfStock = bike.stock === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-8"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
              className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:h-auto relative"
            >
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur rounded-full p-2 text-forest-900 hover:bg-forest-900 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 bg-gray-100 relative h-64 md:h-auto">
                <img 
                  src={bike.image} 
                  alt={bike.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider text-forest-900">
                  {bike.category}
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
                <div className="mb-auto">
                  <div className="flex items-center gap-3 mb-2">
                    {isOutOfStock ? (
                      <span className="flex items-center gap-1.5 text-red-500 text-sm font-bold uppercase tracking-wide">
                        <AlertTriangle size={16} /> Out of Stock
                      </span>
                    ) : isLowStock ? (
                      <span className="flex items-center gap-1.5 text-amber-500 text-sm font-bold uppercase tracking-wide">
                        <AlertTriangle size={16} /> Only {bike.stock} Left
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-green-600 text-sm font-bold uppercase tracking-wide">
                        <Check size={16} /> In Stock ({bike.stock})
                      </span>
                    )}
                  </div>

                  <h2 className="text-4xl font-display font-bold text-forest-900 mb-2 leading-tight">
                    {bike.name}
                  </h2>
                  <h3 className="text-3xl font-bold text-accent-500 mb-6">
                    €{bike.price.toLocaleString()}
                  </h3>

                  <p className="text-gray-600 text-lg leading-relaxed mb-8 border-b border-gray-100 pb-8">
                    {bike.description}
                  </p>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                    {bike.frameSize && (
                      <div className="flex items-start gap-3">
                        <div className="bg-forest-50 p-2 rounded-lg text-forest-800">
                          <Ruler size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Frame Size</p>
                          <p className="font-medium text-forest-900">{bike.frameSize}</p>
                        </div>
                      </div>
                    )}
                    
                    {bike.weight && (
                      <div className="flex items-start gap-3">
                        <div className="bg-forest-50 p-2 rounded-lg text-forest-800">
                          <Weight size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Weight</p>
                          <p className="font-medium text-forest-900">{bike.weight}</p>
                        </div>
                      </div>
                    )}

                    <div className="col-span-2 flex items-start gap-3">
                      <div className="bg-forest-50 p-2 rounded-lg text-forest-800">
                         <Box size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Key Features</p>
                        <div className="flex flex-wrap gap-2">
                          {bike.specs.map((spec, i) => (
                            <span key={i} className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-6">
                  <button
                    onClick={() => {
                      onAddToCart(bike);
                      // Optional: close modal on add? 
                      // onClose(); 
                    }}
                    disabled={isOutOfStock}
                    className={`w-full py-4 rounded-xl font-bold text-lg uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                      isOutOfStock 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-forest-900 text-white hover:bg-accent-500 shadow-xl hover:shadow-accent-500/20'
                    }`}
                  >
                    <ShoppingCart size={20} />
                    {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-4">
                    Free shipping on all orders. 30-day return policy.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;