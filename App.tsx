import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import ProductModal from './components/ProductModal';
import BikeLoader from './components/BikeLoader';
import Home from './pages/Home';
import Shop from './pages/Shop';
import SellerLogin from './pages/SellerLogin';
import SellerDashboard from './pages/SellerDashboard';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import { CodeOfEthics, Careers, Legal, Shipping, Returns, ProductCare } from './pages/InfoPages';
import Footer from './components/Footer';
import { MOCK_SALES_DATA } from './constants';
import { Bike, CartItem, Order } from './types';
import { auth } from './services/firebase';
import { AlertTriangle, Lock } from 'lucide-react';
import { 
  subscribeToProducts, 
  addProductToDb, 
  deleteProductFromDb, 
  updateProductInDb,
  saveOrderToDb,
  subscribeToOrders 
} from './services/db';

const Layout: React.FC<{ children: React.ReactNode; cartCount: number; onOpenCart: () => void }> = ({ children, cartCount, onOpenCart }) => {
  const location = useLocation();
  const isDashboard = location.pathname.includes('/seller') && !location.pathname.includes('/login');
  const isLogin = location.pathname.includes('/login');
  const isCheckout = location.pathname.includes('/checkout');
  const hideLayout = isDashboard || isLogin || isCheckout;

  return (
    <>
      {!hideLayout && <Navbar cartCount={cartCount} onOpenCart={onOpenCart} />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
};

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Bike[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Bike | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State to track if Firestore rules are blocking us
  const [dbPermissionError, setDbPermissionError] = useState(false);
  
  // Loading state for initial fetch
  const [isLoading, setIsLoading] = useState(true);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // --- Data Synchronization ---
  useEffect(() => {
    let unsubscribeProducts: (() => void) | undefined;
    let unsubscribeOrders: (() => void) | undefined;

    // Function to start listening to products
    const initProductStream = () => {
      // If we already have a listener, kill it first to avoid duplicates
      if (unsubscribeProducts) unsubscribeProducts();
      
      console.log("Connecting to Product Stream...");
      unsubscribeProducts = subscribeToProducts(
        (newProducts) => {
          console.log(`Fetched ${newProducts.length} products.`);
          setProducts(newProducts);
          setDbPermissionError(false); // Clear error on success
          setIsLoading(false); // Stop loading
        },
        (error) => {
          // If we get a permission denied error, update state to show banner
          if (error.code === 'permission-denied') {
            setDbPermissionError(true);
          }
          setIsLoading(false); // Stop loading even on error
        }
      );
    };

    // Function to start listening to orders
    const initOrderStream = () => {
       if (unsubscribeOrders) unsubscribeOrders();
       console.log("Connecting to Order Stream...");
       unsubscribeOrders = subscribeToOrders((newOrders) => {
         setOrders(newOrders);
       });
    };

    // 0. Attempt Anonymous Auth (Fix for Permission Denied if rules are auth != null)
    if (!auth.currentUser) {
        signInAnonymously(auth).catch((err) => {
            // Silence invalid-credential error as it just means auth is not enabled in console
            if (err.code !== 'auth/invalid-credential' && err.code !== 'auth/operation-not-allowed') {
                 console.warn("Anonymous auth failed:", err);
            }
        });
    }

    // 1. Initial attempt
    initProductStream();

    // 2. Listen for Login/Logout to upgrade permissions
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User authenticated (ID:", user.uid, "). Upgrading data connections...");
        // Re-subscribe to products with authenticated permissions
        initProductStream();
        initOrderStream();
      } else {
        console.log("User logged out.");
        if (unsubscribeOrders) {
            unsubscribeOrders();
            unsubscribeOrders = undefined;
        }
        setOrders([]);
        // Re-subscribe as guest
        initProductStream(); 
      }
    });

    // Safety timeout to disable loader if something hangs
    const safetyTimeout = setTimeout(() => setIsLoading(false), 5000);

    return () => {
      if (unsubscribeProducts) unsubscribeProducts();
      if (unsubscribeOrders) unsubscribeOrders();
      unsubscribeAuth();
      clearTimeout(safetyTimeout);
    };
  }, []);

  // --- Cart Actions ---
  const addToCart = (bike: Bike) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === bike.id);
      if (existing) {
        if (existing.quantity + 1 > bike.stock) return prev;
        return prev.map(item => item.id === bike.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...bike, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const product = products.find(p => p.id === id);
        const maxStock = product ? product.stock : 99;
        const newQty = item.quantity + delta;
        return { ...item, quantity: Math.max(1, Math.min(newQty, maxStock)) };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  // --- Smart DB Actions (Try DB -> Fallback Local) ---

  const processOrder = async (customerDetails: { firstName: string; lastName: string; email: string }) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      customerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
      email: customerDetails.email || 'No email provided',
      date: new Date().toLocaleDateString(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    try {
      await saveOrderToDb(newOrder);
    } catch (error) {
      console.warn("Order save failed (offline/permission). Saving locally.", error);
      setOrders(prev => [newOrder, ...prev]);
    }

    // Handle Stock Update (Hybrid)
    for (const item of cart) {
      try {
         const product = products.find(p => p.id === item.id);
         if (product) {
            await updateProductInDb(item.id, { stock: Math.max(0, product.stock - item.quantity) });
         }
      } catch (e) {
         setProducts(prev => prev.map(p => 
           p.id === item.id ? { ...p, stock: Math.max(0, p.stock - item.quantity) } : p
         ));
      }
    }

    clearCart();
  };

  const addProduct = async (bike: Bike) => {
    try {
      await addProductToDb(bike);
      // Note: We don't need to manually update state here because the 
      // subscribeToProducts listener will fire and update it automatically.
    } catch (error) {
      console.warn("Add product failed (offline/permission). Adding locally.", error);
      setProducts(prev => [...prev, bike]);
    }
  };

  const removeProduct = async (id: string) => {
    try {
      await deleteProductFromDb(id);
    } catch (error) {
      console.warn("Remove product failed (offline/permission). Removing locally.", error);
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const updateProductStock = async (id: string, newStock: number) => {
    try {
      await updateProductInDb(id, { stock: Math.max(0, newStock) });
    } catch (error) {
      console.warn("Update stock failed (offline/permission). Updating locally.", error);
      setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: Math.max(0, newStock) } : p));
    }
  };

  const updateProductPrice = async (id: string, newPrice: number) => {
    try {
      await updateProductInDb(id, { price: Math.max(0, newPrice) });
    } catch (error) {
      console.warn("Update price failed (offline/permission). Updating locally.", error);
      setProducts(prev => prev.map(p => p.id === id ? { ...p, price: Math.max(0, newPrice) } : p));
    }
  };

  // --- Modal ---
  const handleProductClick = (bike: Bike) => {
    setSelectedProduct(bike);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  if (isLoading) {
    return <BikeLoader />;
  }

  return (
    <HashRouter>
      <ScrollToTop />
      
      {/* Configuration Error Blocking Modal */}
      {dbPermissionError && (
        <div className="fixed inset-0 z-[99999] bg-forest-900/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-white text-center">
          <div className="bg-red-500/20 p-6 rounded-full mb-6 animate-pulse">
            <Lock size={48} className="text-red-500" />
          </div>
          <h1 className="text-3xl font-display font-bold uppercase tracking-widest mb-4">Database Locked</h1>
          <p className="max-w-xl text-lg text-gray-300 mb-8">
            The app cannot read the <strong>products</strong> collection because your Firebase Security Rules are blocking access.
          </p>
          
          <div className="bg-black/50 p-6 rounded-xl max-w-2xl w-full text-left font-mono text-sm border border-gray-700">
            <p className="text-green-400 mb-2">// 1. Go to Firebase Console &gt; Firestore &gt; Rules</p>
            <p className="text-green-400 mb-4">// 2. Paste this configuration:</p>
            <div className="text-gray-300 select-all">
              rules_version = '2';<br/>
              service cloud.firestore {'{'}<br/>
              &nbsp;&nbsp;match /databases/&#123;database&#125;/documents {'{'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">match /products/&#123;product&#125; {'{'} allow read: if true; allow write: if request.auth != null; {'}'}</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">match /orders/&#123;order&#125; {'{'} allow read, write: if request.auth != null; {'}'}</span><br/>
              &nbsp;&nbsp;{'}'}<br/>
              {'}'}
            </div>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 bg-white text-forest-900 px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-accent-500 hover:text-white transition-colors"
          >
            I Updated The Rules, Reload App
          </button>
        </div>
      )}

      <Layout cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)}>
        <Routes>
          <Route path="/" element={<Home featuredProducts={products} onAddToCart={addToCart} onProductClick={handleProductClick} />} />
          <Route path="/shop" element={<Shop products={products} onAddToCart={addToCart} onProductClick={handleProductClick} />} />
          <Route path="/checkout" element={<Checkout cart={cart} onProcessOrder={processOrder} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ethics" element={<CodeOfEthics />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/care" element={<ProductCare />} />
          <Route path="/seller/login" element={<SellerLogin />} />
          <Route 
            path="/seller/dashboard" 
            element={
              <SellerDashboard 
                products={products} 
                salesData={MOCK_SALES_DATA}
                orders={orders}
                onAddProduct={addProduct} 
                onRemoveProduct={removeProduct}
                onUpdateStock={updateProductStock}
                onUpdatePrice={updateProductPrice}
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
      />

      <ProductModal 
        isOpen={isModalOpen}
        onClose={closeProductModal}
        bike={selectedProduct}
        onAddToCart={addToCart}
      />
    </HashRouter>
  );
};

export default App;