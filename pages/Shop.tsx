import React, { useState, useEffect } from 'react';
import { Bike, BikeCategory } from '../types';
import ProductCard from '../components/ProductCard';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShopProps {
  products: Bike[];
  onAddToCart: (bike: Bike) => void;
  onProductClick: (bike: Bike) => void;
}

const ITEMS_PER_PAGE = 8;

const Shop: React.FC<ShopProps> = ({ products, onAddToCart, onProductClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<BikeCategory | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-forest-50 min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-display font-bold text-forest-900 mb-8 uppercase"
        >
          Shop Bikes
        </motion.h1>
        
        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-4 mb-12 items-center"
        >
          <div className="flex items-center gap-2 text-forest-800 font-bold mr-4">
            <Filter size={20} />
            <span>Filter By:</span>
          </div>
          <button 
            onClick={() => setSelectedCategory('All')}
            className={`px-6 py-2 rounded-full text-sm font-bold uppercase transition-all ${selectedCategory === 'All' ? 'bg-forest-900 text-white' : 'bg-white text-forest-900 border border-forest-100 hover:border-forest-900'}`}
          >
            All Models
          </button>
          {Object.values(BikeCategory).map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase transition-all ${selectedCategory === cat ? 'bg-forest-900 text-white' : 'bg-white text-forest-900 border border-forest-100 hover:border-forest-900'}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16"
        >
          <AnimatePresence mode="popLayout">
            {currentProducts.map((bike) => (
              <motion.div
                layout
                key={bike.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard bike={bike} onAddToCart={onAddToCart} onClick={onProductClick} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-24 text-gray-500"
          >
            No bikes found in this category.
          </motion.div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 rounded-full bg-white border border-gray-200 text-forest-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-forest-50 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-full font-bold transition-all ${
                    currentPage === page 
                      ? 'bg-forest-900 text-white shadow-lg scale-110' 
                      : 'bg-white text-forest-900 border border-gray-200 hover:bg-forest-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full bg-white border border-gray-200 text-forest-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-forest-50 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;