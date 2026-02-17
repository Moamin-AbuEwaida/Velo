import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.includes('/seller');

  if (isDashboard) return null; // Handle dashboard nav separately or hide standard nav

  return (
    <nav className="sticky top-0 z-50 bg-forest-900 text-forest-50 py-4 px-6 md:px-12 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-display font-bold tracking-tighter hover:text-accent-500 transition-colors">
          VELO<span className="text-accent-500">VIBE</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 font-sans font-medium text-sm tracking-wide">
          <Link to="/" className="hover:text-accent-500 transition-colors uppercase">Home</Link>
          <Link to="/shop" className="hover:text-accent-500 transition-colors uppercase">Shop</Link>
          <Link to="/seller/login" className="hover:text-accent-500 transition-colors uppercase flex items-center gap-1">
             Seller Access
          </Link>
          <button 
            onClick={onOpenCart}
            className="flex items-center gap-2 hover:text-accent-500 transition-colors group"
          >
            <div className="relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="uppercase">Cart ({cartCount})</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-forest-50 hover:text-accent-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-forest-900 border-t border-forest-800 p-6 flex flex-col space-y-4 shadow-xl">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:text-accent-500 uppercase font-medium">Home</Link>
          <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:text-accent-500 uppercase font-medium">Shop</Link>
          <Link to="/seller/login" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:text-accent-500 uppercase font-medium">Seller Login</Link>
          <button onClick={() => { onOpenCart(); setIsMenuOpen(false); }} className="text-left py-2 hover:text-accent-500 uppercase font-medium flex items-center gap-2">
            Cart ({cartCount})
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
