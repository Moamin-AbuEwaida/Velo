import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, AlertCircle, UserPlus } from 'lucide-react';
import { auth } from '../services/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  setPersistence, 
  browserLocalPersistence 
} from 'firebase/auth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const SellerLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await setPersistence(auth, browserLocalPersistence);

      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/seller/dashboard');
    } catch (err: any) {
      console.error(err);
      if (
        err.code === 'auth/invalid-credential' || 
        err.code === 'auth/user-not-found' || 
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/invalid-email'
      ) {
        setError('Email or password is incorrect');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('User already exists. Please sign in');
      } else {
        setError(err.message || 'Authentication failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forest-900 flex items-center justify-center p-6 relative">
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 md:top-12 md:left-12 text-forest-200 hover:text-white flex items-center gap-2 font-bold uppercase tracking-wider text-sm transition-colors"
      >
        <ArrowLeft size={20} /> Back to Home
      </button>

      <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-forest-900 uppercase">
            {isSignUp ? 'Seller Register' : 'Seller Access'}
          </h1>
          <p className="text-gray-500 mt-2">Secure Dashboard {isSignUp ? 'Registration' : 'Login'}</p>
        </div>
        
        <form onSubmit={handleAuth} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <Input 
            label="Email Address"
            type="email"
            placeholder="admin@velovibe.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Input 
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Button 
            type="submit" 
            isLoading={loading}
            className="w-full bg-accent-500 hover:bg-accent-600"
            icon={isSignUp ? <UserPlus size={18} /> : <Lock size={18} />}
          >
            {isSignUp ? 'Create Account' : 'Login to Dashboard'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
            }}
            className="text-forest-600 hover:text-accent-500 text-sm font-bold underline underline-offset-4 transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default SellerLogin;