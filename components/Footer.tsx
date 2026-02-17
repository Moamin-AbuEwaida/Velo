import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 text-white pt-20 pb-10 border-t border-forest-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Call to Action */}
        <div className="border-b border-forest-800 pb-16 mb-12 flex flex-col lg:flex-row justify-between items-center text-center lg:text-left gap-8">
          <div className="max-w-xl">
             <h2 className="text-3xl md:text-5xl font-display font-bold uppercase mb-4">Shop From <span className="text-accent-500">Below</span></h2>
             <p className="text-forest-200 text-sm md:text-base">Join the revolution. Get the latest updates, exclusive drops, and special offers directly to your inbox.</p>
          </div>
          <div className="w-full lg:w-auto flex justify-center lg:justify-end">
             <div className="flex bg-white rounded-full p-1.5 w-full max-w-md shadow-2xl border border-white/10 relative z-10">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 bg-transparent px-4 md:px-6 py-2 md:py-3 text-forest-900 placeholder-gray-400 outline-none rounded-full min-w-0 text-sm md:text-base" 
                />
                <button className="bg-accent-500 text-white font-bold px-5 md:px-8 py-2 md:py-3 rounded-full hover:bg-accent-600 transition-colors uppercase text-xs md:text-sm whitespace-nowrap shadow-md">
                  Subscribe
                </button>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div>
            <h3 className="font-bold text-lg mb-6 uppercase tracking-wider text-forest-50">About Us</h3>
            <ul className="space-y-4 text-forest-300 text-sm">
              <li><Link to="/about" className="hover:text-accent-500 transition-colors hover:translate-x-1 inline-block duration-200">Equilibrium</Link></li>
              <li><Link to="/ethics" className="hover:text-accent-500 transition-colors hover:translate-x-1 inline-block duration-200">Code of Ethics</Link></li>
              <li><Link to="/careers" className="hover:text-accent-500 transition-colors hover:translate-x-1 inline-block duration-200">Careers</Link></li>
              <li><Link to="/legal" className="hover:text-accent-500 transition-colors hover:translate-x-1 inline-block duration-200">Legal</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-6 uppercase tracking-wider text-forest-50">Support</h3>
            <ul className="space-y-4 text-forest-300 text-sm">
              <li><Link to="/contact" className="hover:text-accent-500 transition-colors hover:translate-x-1 inline-block duration-200">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-accent-500 transition-colors hover:translate-x-1 inline-block duration-200">Shipping Services</Link></li>
              <li><Link to="/returns" className="hover:text-accent-500 transition-colors hover:translate-x-1 inline-block duration-200">Returns & Exchanges</Link></li>
              <li><Link to="/care" className="hover:text-accent-500 transition-colors hover:translate-x-1 inline-block duration-200">Product Care</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2 flex flex-col items-center md:items-end text-center md:text-right">
             <h3 className="font-bold text-lg mb-6 uppercase tracking-wider text-forest-50">Follow Us</h3>
             <div className="flex space-x-4 mb-6">
               <SocialButton href="#" icon={<Facebook size={20} />} />
               <SocialButton href="#" icon={<Twitter size={20} />} />
               <SocialButton href="#" icon={<Instagram size={20} />} />
               <SocialButton href="#" icon={<Youtube size={20} />} />
             </div>
             <p className="text-forest-400 text-sm max-w-xs">
               Tag us <span className="text-accent-500 font-bold">@VeloVibe</span> to get featured on our monthly community highlight reel.
             </p>
          </div>
        </div>

        <div className="pt-8 border-t border-forest-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-forest-500 font-medium uppercase tracking-wider">
          <p>© {currentYear} VeloVibe Cycles. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="/legal" className="hover:text-forest-300">Privacy Policy</Link>
            <Link to="/legal" className="hover:text-forest-300">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialButton = ({ href, icon }: { href: string, icon: React.ReactNode }) => (
  <motion.a 
    href={href}
    className="p-3 bg-forest-900/50 border border-forest-800 rounded-full text-white flex items-center justify-center hover:border-accent-500/50"
    whileHover="hover"
    initial="initial"
    variants={{
      initial: { scale: 1, backgroundColor: 'rgba(6, 95, 70, 0.5)' }, 
      hover: { 
        scale: 1.15, 
        backgroundColor: '#f97316', // accent-500
        boxShadow: "0 0 15px rgba(249, 115, 22, 0.5)"
      }
    }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <motion.div
      variants={{
        hover: { rotate: 360 }
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {icon}
    </motion.div>
  </motion.a>
);

export default Footer;