import React from 'react';
import { motion } from 'framer-motion';

// Shared Layout Component
const InfoLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="min-h-screen bg-white pt-12 pb-24">
    <div className="max-w-4xl mx-auto px-6 md:px-12">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-display font-bold text-forest-900 mb-12 border-b border-gray-100 pb-8"
      >
        {title}
      </motion.h1>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="prose prose-lg prose-forest text-gray-600"
      >
        {children}
      </motion.div>
    </div>
  </div>
);

export const CodeOfEthics: React.FC = () => (
  <InfoLayout title="Code of Ethics">
    <p>At VeloVibe, integrity is the framework of our business.</p>
    <h3 className="text-forest-900 font-bold mt-8 mb-4">1. Fair Labor Practices</h3>
    <p>We are committed to ensuring that all workers in our supply chain are treated with dignity and respect. We strictly prohibit the use of forced labor and child labor.</p>
    <h3 className="text-forest-900 font-bold mt-8 mb-4">2. Environmental Stewardship</h3>
    <p>We recognize our responsibility to the planet. We actively work to minimize waste, reduce our carbon footprint, and source materials from sustainable suppliers.</p>
    <h3 className="text-forest-900 font-bold mt-8 mb-4">3. Transparency</h3>
    <p>We believe in honest communication with our customers, employees, and stakeholders. We do not make false claims about our products' performance or environmental impact.</p>
  </InfoLayout>
);

export const Careers: React.FC = () => (
  <InfoLayout title="Careers at VeloVibe">
    <p className="lead text-xl text-forest-800 mb-8">Join the ride. We're looking for passionate individuals to help us reshape urban mobility.</p>
    
    <div className="space-y-6">
      {['Senior Bicycle Mechanic', 'E-Commerce Marketing Manager', 'Customer Experience Specialist', 'Supply Chain Coordinator'].map((job, i) => (
        <div key={i} className="border border-gray-200 rounded-xl p-6 hover:border-accent-500 transition-colors cursor-pointer group">
          <div className="flex justify-between items-center">
             <h3 className="font-bold text-lg text-forest-900 group-hover:text-accent-500 transition-colors">{job}</h3>
             <span className="text-sm bg-forest-50 text-forest-800 px-3 py-1 rounded-full">Full Time</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Remote / Portland, OR</p>
        </div>
      ))}
    </div>
    <div className="mt-12 p-8 bg-gray-50 rounded-xl text-center">
       <p>Don't see your role? Send your resume to <span className="font-bold text-forest-900">careers@velovibe.com</span></p>
    </div>
  </InfoLayout>
);

export const Legal: React.FC = () => (
  <InfoLayout title="Legal & Privacy Policy">
    <p>Effective Date: January 1, 2024</p>
    <h3 className="text-forest-900 font-bold mt-8 mb-4">Terms of Service</h3>
    <p>By accessing this website, you agree to be bound by these Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
    <h3 className="text-forest-900 font-bold mt-8 mb-4">Privacy Policy</h3>
    <p>Your privacy is important to us. It is VeloVibe's policy to respect your privacy regarding any information we may collect from you across our website. We only ask for personal information when we truly need it to provide a service to you.</p>
    <h3 className="text-forest-900 font-bold mt-8 mb-4">Cookie Policy</h3>
    <p>We use cookies to help us improve, promote, and protect our services. By continuing to use the site, you agree to our cookie policy.</p>
  </InfoLayout>
);

export const Shipping: React.FC = () => (
  <InfoLayout title="Shipping Services">
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      <div className="bg-forest-50 p-6 rounded-xl text-center">
        <h4 className="font-bold text-forest-900 mb-2">Standard</h4>
        <p className="text-2xl font-bold text-accent-500 mb-2">Free</p>
        <p className="text-sm text-gray-500">5-7 Business Days</p>
      </div>
      <div className="bg-forest-50 p-6 rounded-xl text-center border-2 border-accent-500 relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-500 text-white text-xs px-2 py-1 rounded">Popular</div>
        <h4 className="font-bold text-forest-900 mb-2">Expedited</h4>
        <p className="text-2xl font-bold text-accent-500 mb-2">€29.99</p>
        <p className="text-sm text-gray-500">2-3 Business Days</p>
      </div>
      <div className="bg-forest-50 p-6 rounded-xl text-center">
        <h4 className="font-bold text-forest-900 mb-2">Overnight</h4>
        <p className="text-2xl font-bold text-accent-500 mb-2">€89.99</p>
        <p className="text-sm text-gray-500">Next Business Day</p>
      </div>
    </div>
    <h3 className="text-forest-900 font-bold mt-8 mb-4">Box & Assembly</h3>
    <p>All bikes are shipped 85% assembled. You will need to install the front wheel, handlebars, and pedals. Tools and instructions are included in the box.</p>
    <h3 className="text-forest-900 font-bold mt-8 mb-4">International Shipping</h3>
    <p>We currently ship to the US, Canada, and select European countries. International shipping rates are calculated at checkout.</p>
  </InfoLayout>
);

export const Returns: React.FC = () => (
  <InfoLayout title="Returns & Exchanges">
    <p className="text-lg mb-8">We want you to love your ride. If you aren't 100% satisfied, we're here to help.</p>
    <h3 className="text-forest-900 font-bold mt-8 mb-4">30-Day Test Ride</h3>
    <p>You have 30 days from the date of delivery to test your bike. If it's not the right fit, you can return it for a full refund, minus a €50 restocking fee.</p>
    <h3 className="text-forest-900 font-bold mt-8 mb-4">Return Conditions</h3>
    <ul className="list-disc pl-5 space-y-2">
      <li>The bike must be clean and in like-new condition.</li>
      <li>Less than 20 miles on the odometer for e-bikes.</li>
      <li>Must include all original accessories, manuals, and packaging.</li>
    </ul>
    <h3 className="text-forest-900 font-bold mt-8 mb-4">How to Initiate a Return</h3>
    <p>Contact our support team at returns@velovibe.com with your order number. We will provide a prepaid shipping label.</p>
  </InfoLayout>
);

export const ProductCare: React.FC = () => (
  <InfoLayout title="Product Care Guide">
    <p>Proper maintenance ensures your VeloVibe cycle lasts a lifetime.</p>
    
    <div className="grid md:grid-cols-2 gap-8 mt-8">
      <div>
        <h3 className="text-forest-900 font-bold mb-4 text-xl">Battery Care (E-Bikes)</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Charge your battery at room temperature.</li>
          <li>Avoid draining the battery completely to 0%.</li>
          <li>If storing for long periods, keep charge between 30-60%.</li>
          <li>Keep contacts clean and dry.</li>
        </ul>
      </div>
      <div>
        <h3 className="text-forest-900 font-bold mb-4 text-xl">Mechanical Care</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Lubricate your chain every 100-150 miles.</li>
          <li>Check tire pressure weekly.</li>
          <li>Keep brake rotors clean and free of oil.</li>
          <li>Schedule a professional tune-up annually.</li>
        </ul>
      </div>
    </div>
  </InfoLayout>
);