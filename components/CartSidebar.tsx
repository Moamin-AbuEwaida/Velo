import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';
import Button from './ui/Button';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cartItems, onRemove, onUpdateQty }) => {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="p-6 bg-forest-900 text-white flex justify-between items-center shadow-md z-10">
            <h2 className="text-2xl font-display font-bold uppercase tracking-wider">Your Cart</h2>
            <button onClick={onClose} className="hover:text-accent-500 transition-colors bg-forest-800/50 p-2 rounded-full hover:bg-white/10">
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-6">
                <div className="bg-gray-100 p-6 rounded-full">
                  <ShoppingBag size={48} className="text-gray-300" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-forest-900 mb-2">Your cart is empty</p>
                  <p className="text-sm text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
                  <button onClick={onClose} className="text-accent-500 hover:text-accent-600 font-bold uppercase tracking-widest text-sm hover:underline">
                    Start Shopping
                  </button>
                </div>
              </div>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="flex gap-5 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-forest-900 leading-tight mb-1">{item.name}</h3>
                        <button 
                          onClick={() => onRemove(item.id)} 
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-accent-600 font-bold uppercase tracking-wide text-[10px]">{item.category}</p>
                    </div>
                    
                    <div className="flex justify-between items-end mt-3">
                      {/* High visibility quantity controls */}
                      <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <button 
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-forest-900 hover:bg-forest-900 hover:text-white transition-colors active:bg-accent-500"
                        >
                          <Minus size={14} strokeWidth={3} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-forest-900">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-forest-900 hover:bg-forest-900 hover:text-white transition-colors active:bg-accent-500"
                        >
                          <Plus size={14} strokeWidth={3} />
                        </button>
                      </div>
                      
                      <span className="font-display font-bold text-xl text-forest-900">
                        €{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium text-gray-500">Subtotal</span>
                <span className="text-3xl font-display font-bold text-forest-900">€{total.toLocaleString()}</span>
              </div>
              <Button 
                onClick={handleCheckout} 
                size="lg" 
                className="w-full"
                icon={<ShoppingBag size={20} />}
              >
                Checkout Now
              </Button>
              <p className="text-xs text-center text-gray-400 mt-4 font-medium">
                Taxes and shipping calculated at checkout.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;