import React from 'react';
import { motion } from 'framer-motion';
import { Bike, Users, Globe, Leaf } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden flex items-center justify-center">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=2000" 
          alt="Cyclists on a ridge"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-forest-900/60" />
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-display font-bold uppercase mb-4"
          >
            Equilibrium
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl font-light max-w-2xl mx-auto"
          >
            Finding the perfect balance between human ambition and mechanical precision.
          </motion.p>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-display font-bold text-forest-900 mb-6 uppercase">Our Philosophy</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            At VeloVibe, we don't just sell bikes; we curate experiences. Established in 2023, our mission has been to bridge the gap between high-performance engineering and sustainable urban mobility. We believe that every pedal stroke is a step towards a cleaner, healthier, and more connected world.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <ValueCard 
            icon={<Leaf className="text-accent-500" size={32} />}
            title="Sustainability First"
            desc="Our electric fleet is designed to reduce carbon footprints without compromising on power or style. We use recycled materials wherever possible."
          />
          <ValueCard 
            icon={<Bike className="text-accent-500" size={32} />}
            title="Precision Engineering"
            desc="Every bike in our catalog undergoes rigorous testing. From carbon fiber weaves to hydraulic systems, we obsession over details."
          />
          <ValueCard 
            icon={<Users className="text-accent-500" size={32} />}
            title="Community Driven"
            desc="We aren't just a shop; we are a hub for riders. Weekly group rides, workshops, and events keep our community rolling together."
          />
          <ValueCard 
            icon={<Globe className="text-accent-500" size={32} />}
            title="Global Reach"
            desc="Born in the city, ridden worldwide. Our shipping logistics ensure that VeloVibe quality reaches you, no matter where the road leads."
          />
        </div>
      </div>
    </div>
  );
};

const ValueCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-forest-50 p-8 rounded-2xl"
  >
    <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-sm">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-forest-900 mb-3">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
);

export default About;