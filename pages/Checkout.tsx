import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, Lock, ArrowLeft, ShieldCheck, CreditCard
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface CheckoutProps {
  cart: CartItem[];
  onProcessOrder: (customerDetails: { firstName: string; lastName: string; email: string }) => void;
}

type PaymentMethod = 'visa' | 'paypal' | 'stripe' | 'apple' | 'google';

const Checkout: React.FC<CheckoutProps> = ({ cart, onProcessOrder }) => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('visa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '', 
    address: '',
    city: '',
    zip: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) {
      alert("Please fill in your name details.");
      return;
    }
    
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Trigger the order processing in parent to update stock and save order
      onProcessOrder({ 
        firstName: formData.firstName, 
        lastName: formData.lastName,
        email: formData.email
      });
    }, 2000);
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-display font-bold text-forest-900 mb-4">Your cart is empty</h2>
        <button 
          onClick={() => navigate('/shop')}
          className="text-accent-500 font-bold hover:underline"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-forest-900 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-3xl max-w-lg w-full text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h1 className="text-4xl font-display font-bold text-forest-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-500 mb-8">
            Thank you for your purchase, {formData.firstName}. Your new ride is on its way.
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="w-full"
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-forest-600 font-bold mb-8 hover:text-forest-900 transition-colors"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <h1 className="text-4xl font-display font-bold text-forest-900 mb-8 uppercase">Secure Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column: Forms */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Shipping Info */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-forest-900 mb-6 flex items-center gap-2">
                <span className="bg-forest-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Shipping Details
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <Input 
                  name="firstName" placeholder="First Name" required 
                  value={formData.firstName} onChange={handleInputChange}
                />
                <Input 
                  name="lastName" placeholder="Last Name" required 
                  value={formData.lastName} onChange={handleInputChange}
                />
                <div className="col-span-2">
                  <Input 
                    name="email" placeholder="Email Address" required type="email"
                    value={formData.email} onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2">
                  <Input 
                    name="address" placeholder="Address" 
                    value={formData.address} onChange={handleInputChange}
                  />
                </div>
                <Input 
                  name="city" placeholder="City" 
                  value={formData.city} onChange={handleInputChange}
                />
                <Input 
                  name="zip" placeholder="Zip Code" 
                  value={formData.zip} onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-forest-900 mb-6 flex items-center gap-2">
                <span className="bg-forest-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Payment Method
              </h2>
              
              {/* Method Selector */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <PaymentOption 
                  label="Credit Card" 
                  icon={<CreditCard size={32} />}
                  selected={selectedMethod === 'visa'} 
                  onClick={() => setSelectedMethod('visa')} 
                />
                <PaymentOption 
                  label="PayPal" 
                  icon={<img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-full w-full object-contain" />}
                  selected={selectedMethod === 'paypal'} 
                  onClick={() => setSelectedMethod('paypal')} 
                />
                <PaymentOption 
                  label="Stripe" 
                  icon={<img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-full w-full object-contain" />}
                  selected={selectedMethod === 'stripe'} 
                  onClick={() => setSelectedMethod('stripe')} 
                />
                <PaymentOption 
                  label="Apple Pay" 
                  icon={<img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-full w-full object-contain" />}
                  selected={selectedMethod === 'apple'} 
                  onClick={() => setSelectedMethod('apple')} 
                />
                <PaymentOption 
                  label="Google Pay" 
                  icon={<img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google Pay" className="h-full w-full object-contain" />}
                  selected={selectedMethod === 'google'} 
                  onClick={() => setSelectedMethod('google')} 
                />
              </div>

              {/* Dynamic Form Content */}
              <AnimatePresence mode="wait">
                <motion.form 
                  key={selectedMethod}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handlePayment}
                >
                  {selectedMethod === 'visa' && (
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-gray-500">Supported Cards</span>
                        <div className="flex gap-2 text-forest-800 font-bold text-xs">
                          <span className="bg-white border px-2 py-1 rounded shadow-sm">VISA</span>
                          <span className="bg-white border px-2 py-1 rounded shadow-sm">MC</span>
                          <span className="bg-white border px-2 py-1 rounded shadow-sm">AMEX</span>
                        </div>
                      </div>
                      <Input required type="text" placeholder="Card Number" />
                      <div className="grid grid-cols-2 gap-4">
                        <Input required type="text" placeholder="MM / YY" />
                        <Input required type="text" placeholder="CVC" />
                      </div>
                      <Input required type="text" placeholder="Cardholder Name" />
                    </div>
                  )}

                  {selectedMethod === 'paypal' && (
                    <div className="text-center py-8 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="w-full h-full object-contain" />
                      </div>
                      <p className="text-blue-900 font-medium mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
                      <div className="text-xs text-blue-500">Next step: Log in to PayPal</div>
                    </div>
                  )}

                  {selectedMethod === 'stripe' && (
                     <div className="text-center py-8 bg-indigo-50 rounded-xl border border-indigo-100">
                       <ShieldCheck className="mx-auto text-indigo-600 mb-4" size={48} />
                       <p className="text-indigo-900 font-medium mb-4">Secure payment processed via Stripe Link.</p>
                       <div className="max-w-xs mx-auto">
                         <Input required type="email" placeholder="Email for Stripe Link" />
                       </div>
                     </div>
                  )}

                  {(selectedMethod === 'apple' || selectedMethod === 'google') && (
                    <div className="text-center py-8 bg-gray-100 rounded-xl border border-gray-200">
                       <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        {selectedMethod === 'apple' ? (
                          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="w-full h-full object-contain" />
                        ) : (
                          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google Pay" className="w-full h-full object-contain" />
                        )}
                      </div>
                      <p className="text-gray-900 font-medium mb-4">Confirm on your device using {selectedMethod === 'apple' ? 'Apple Pay' : 'Google Pay'}.</p>
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <Button 
                      type="submit"
                      isLoading={isProcessing}
                      className="w-full"
                      size="lg"
                      icon={<Lock size={20} />}
                    >
                      Pay €{total.toLocaleString()}
                    </Button>
                    <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                      <Lock size={12} /> Encrypted and Secure Payment
                    </p>
                  </div>
                </motion.form>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-display font-bold text-xl text-forest-900 mb-6 uppercase">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-forest-900 text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.category}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                        <span className="font-bold text-forest-900 text-sm">€{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-4 border-t border-gray-100 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>€{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Tax (Est.)</span>
                  <span>€0.00</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 mt-2">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-forest-900 text-lg">Total</span>
                  <span className="font-display font-bold text-3xl text-forest-900">€{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentOption = ({ label, icon, selected, onClick }: { 
  label: string, icon: React.ReactNode, selected: boolean, onClick: () => void 
}) => (
  <button 
    type="button"
    onClick={onClick}
    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all h-24 ${
      selected 
        ? 'border-accent-500 bg-accent-50 ring-2 ring-accent-500 ring-offset-2' 
        : 'border-gray-200 hover:border-forest-200 hover:bg-gray-50'
    }`}
  >
    <div className={`h-8 w-full flex items-center justify-center ${selected ? 'opacity-100 text-accent-600' : 'opacity-70 grayscale hover:grayscale-0 text-gray-600 transition-all'}`}>
      {icon}
    </div>
    <span className={`font-bold text-xs uppercase tracking-wide ${selected ? 'text-accent-700' : 'text-gray-500'}`}>{label}</span>
  </button>
);

export default Checkout;