import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! (This is a demo)");
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-forest-50 pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-forest-900 uppercase mb-4">Get In Touch</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Have a question about a bike? Need help with an order? Our team is here to assist you on your journey.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-display font-bold text-forest-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-forest-100 p-3 rounded-full text-forest-800">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-forest-900">Headquarters</h3>
                    <p className="text-gray-500">123 Cycling Blvd, Gear Town<br/>Portland, OR 97204</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-forest-100 p-3 rounded-full text-forest-800">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-forest-900">Phone</h3>
                    <p className="text-gray-500">+1 (555) 123-4567</p>
                    <p className="text-gray-400 text-sm">Mon-Fri, 9am - 6pm PST</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-forest-100 p-3 rounded-full text-forest-800">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-forest-900">Email</h3>
                    <p className="text-gray-500">support@velovibe.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mock Map */}
            <div className="bg-gray-200 h-80 rounded-2xl overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" 
                alt="Map Placeholder" 
                className="w-full h-full object-cover grayscale opacity-60" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-white px-4 py-2 rounded-lg shadow-lg font-bold text-forest-900 flex items-center gap-2">
                   <MapPin className="text-accent-500" size={18} /> VeloVibe HQ
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 md:p-12 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-display font-bold text-forest-900 mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input 
                label="Your Name"
                placeholder="John Doe"
                required
                value={formState.name}
                onChange={e => setFormState({...formState, name: e.target.value})}
              />
              <Input 
                label="Email Address"
                placeholder="john@example.com"
                type="email"
                required
                value={formState.email}
                onChange={e => setFormState({...formState, email: e.target.value})}
              />
              <Input 
                label="Message"
                placeholder="How can we help you?"
                as="textarea"
                rows={5}
                required
                value={formState.message}
                onChange={e => setFormState({...formState, message: e.target.value})}
              />
              <Button 
                type="submit"
                className="w-full"
                icon={<Send size={18} />}
              >
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;