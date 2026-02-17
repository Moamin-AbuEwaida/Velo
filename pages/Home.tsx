import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Wind, Mountain, Battery, Settings, Award } from 'lucide-react';
import { Bike } from '../types';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';
import { FADE_UP, STAGGER_CONTAINER, FADE_IN } from '../styles/theme';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HomeProps {
  featuredProducts: Bike[];
  onAddToCart: (bike: Bike) => void;
  onProductClick: (bike: Bike) => void;
}

const Home: React.FC<HomeProps> = ({ featuredProducts, onAddToCart, onProductClick }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  const randomProducts = useMemo(() => {
    return [...featuredProducts]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }, [featuredProducts]);

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      
      {/* Hero Section */}
      <header className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[80%] md:w-[50%] h-full bg-gray-50 skew-x-[-10deg] translate-x-[20%] z-0" />

        <motion.div 
          className="absolute right-[-25%] md:right-[-5%] top-[25%] -translate-y-1/2 w-[110%] md:w-[80%] z-10 pointer-events-none mix-blend-multiply opacity-80 md:opacity-100"
          initial={{ x: '100%', opacity: 0, rotate: 5 }}
          animate={{ x: '0%', opacity: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ y: y1 }}
        >
          <img 
            src="https://plus.unsplash.com/premium_photo-1674672910218-bbaa2493c6a0?q=80&w=837&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Premium Bike" 
            className="w-full h-full object-contain"
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-20 pointer-events-none">
          <div className="max-w-2xl pointer-events-auto pt-10 md:pt-20">
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              <h2 className="text-forest-900 text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 bg-gray-100/80 backdrop-blur-sm px-3 py-1 rounded-lg inline-block border border-gray-200/50">
                The New Standard
              </h2>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-9xl font-display font-bold text-forest-950 leading-[0.9] mb-6 md:mb-8 tracking-tighter"
            >
              STREET <br />
              <span className="text-accent-500">PHANTOM</span>
            </motion.h1>

            <motion.p 
              variants={FADE_IN}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="text-forest-950 text-base md:text-xl max-w-md mb-8 md:mb-10 leading-relaxed font-medium bg-white/40 md:bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/40 md:border-white/20 shadow-sm md:shadow-none"
            >
              Stealth black finish. Aerospace-grade carbon fiber. The city is your playground with the ultimate urban machine.
            </motion.p>

            <motion.div 
              variants={FADE_UP}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
              <Link to="/shop">
                <Button size="lg" icon={<ArrowRight size={20} />}>
                   Shop Collection
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-accent-400/20 rounded-full blur-[100px] z-0" />
      </header>

      {/* Features Section */}
      <section className="bg-forest-950 text-white py-16 md:py-24 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 md:mb-16 grid md:grid-cols-2 gap-8 items-end"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold leading-none mb-4">
                Precision <span className="text-accent-500">Engineering</span>
              </h2>
              <div className="h-1 w-20 bg-accent-500 rounded-full"></div>
            </div>
            <p className="text-forest-200 text-base md:text-lg max-w-sm">
              Every curve, weld, and component is obsessed over to deliver the smoothest ride of your life.
            </p>
          </motion.div>

          <motion.div 
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16"
          >
            <FeatureIcon icon={<Zap size={32} />} title="Dual 600W Motors" desc="High torque motors designed for steep inclines and rapid acceleration." />
            <FeatureIcon icon={<Wind size={32} />} title="Smooth Body" desc="Aerodynamic carbon fiber frame reducing drag coefficient by 15%." />
            <FeatureIcon icon={<Battery size={32} />} title="24 Miles Range" desc="Long lasting lithium cells that get you there and back on a single charge." />
            <FeatureIcon icon={<Settings size={32} />} title="Replaceable Tires" desc="Standard fitments allow for easy maintenance and customization." />
            <FeatureIcon icon={<Mountain size={32} />} title="Four Speed Gears" desc="Seamless shifting for any terrain you encounter." />
            <FeatureIcon icon={<Award size={32} />} title="30° Uphill" desc="Conquer the steepest hills with our advanced torque sensing." />
          </motion.div>
        </div>
      </section>

      {/* New Collection / Featured */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 bg-gray-50">
        <motion.div 
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-accent-600 font-bold tracking-widest uppercase text-sm mb-2 block">Latest Arrivals</span>
          <h2 className="text-4xl md:text-7xl font-display font-bold text-forest-900 uppercase mb-6">Our New Collection</h2>
          <p className="max-w-xl mx-auto text-gray-500 text-sm md:text-base">
            Discover the latest additions to our fleet. From city cruisers to mountain beasts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {randomProducts.map((bike, index) => (
            <motion.div
              key={bike.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard bike={bike} onAddToCart={onAddToCart} onClick={onProductClick} />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/shop">
            <Button variant="outline" size="lg">View All Bikes</Button>
          </Link>
        </div>
      </section>
      
      {/* Video/Banner Section */}
      <section className="h-[50vh] md:h-[60vh] relative overflow-hidden flex items-center justify-center group bg-black">
         <video 
           autoPlay 
           loop 
           muted 
           playsInline
           poster="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=2000"
           className="absolute inset-0 w-full h-full object-cover opacity-80"
         >
           <source src="https://cdn.pixabay.com/video/2020/08/16/47372-451393664_large.mp4" type="video/mp4" />
         </video>
         
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
         
         <motion.div 
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            className="relative z-10 text-center px-4"
         >
            <h2 className="text-white text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-4 drop-shadow-2xl leading-tight">
              Unleash the <span className="text-accent-500">Power</span>
            </h2>
            <Link to="/shop">
              <Button size="lg" className="mt-4 shadow-xl">Explore Series</Button>
            </Link>
         </motion.div>
      </section>
    </div>
  );
};

const FeatureIcon = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <motion.div 
    variants={FADE_UP}
    className="flex flex-col items-center text-center space-y-4 cursor-default group"
  >
    <motion.div 
      whileHover={{ 
        scale: 1.1, 
        backgroundColor: "rgba(249, 115, 22, 0.2)",
        color: "#f97316",
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className="p-4 bg-white/5 rounded-2xl text-accent-500 backdrop-blur-sm border border-white/10 transition-colors"
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {icon}
      </motion.div>
    </motion.div>
    <h3 className="text-lg md:text-xl font-display font-bold uppercase tracking-wide group-hover:text-accent-500 transition-colors duration-300">{title}</h3>
    <p className="text-forest-200 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export default Home;