import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bike, BikeCategory, SalesData, Order } from '../types';
import { auth } from '../services/firebase';
import { seedDatabase, uploadProductImage } from '../services/db';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  Package, TrendingUp, Plus, Trash2, LogOut, Minus, ShoppingBag, Database, Upload, Image as ImageIcon, AlertCircle, Copy
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { THEME_COLORS } from '../styles/theme';

interface SellerDashboardProps {
  products: Bike[];
  salesData: SalesData[];
  orders: Order[];
  onAddProduct: (bike: Bike) => Promise<void>;
  onRemoveProduct: (id: string) => Promise<void>;
  onUpdateStock: (id: string, newStock: number) => Promise<void>;
  onUpdatePrice: (id: string, newPrice: number) => Promise<void>;
}

const SellerDashboard: React.FC<SellerDashboardProps> = ({ products, salesData, orders, onAddProduct, onRemoveProduct, onUpdateStock, onUpdatePrice }) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'stats' | 'orders'>('inventory');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [storageError, setStorageError] = useState(false);
  
  // Form State
  const [newBike, setNewBike] = useState<Partial<Bike>>({
    name: '',
    price: 0,
    category: BikeCategory.ROAD,
    image: '',
    stock: 0,
    description: '',
    specs: [],
    weight: '',
    frameSize: ''
  });
  const [specsInput, setSpecsInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSeedDatabase = async () => {
    if (window.confirm("This will add default products to your Firestore database. Continue?")) {
        setIsSeeding(true);
        const result = await seedDatabase();
        alert(result.message);
        setIsSeeding(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      // Create local preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStorageError(false);
    
    if (!auth.currentUser) {
        alert("Please log in to add products.");
        return;
    }

    if (newBike.name && newBike.price) {
      setIsSubmitting(true);

      try {
        let finalImageUrl = newBike.image;

        // If a file is selected, upload it first
        if (imageFile) {
          try {
             finalImageUrl = await uploadProductImage(imageFile);
          } catch (uploadErr: any) {
             if (uploadErr.message.includes('Storage Permission Denied')) {
                setStorageError(true);
                setIsSubmitting(false);
                return; // Stop here if storage fails
             }
             throw uploadErr; // Rethrow other errors
          }
        } else if (!finalImageUrl) {
           finalImageUrl = 'https://plus.unsplash.com/premium_photo-1674672910218-bbaa2493c6a0?q=80&w=837&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
        }

        const bike: Bike = {
          id: Date.now().toString(),
          name: newBike.name,
          price: Number(newBike.price),
          category: newBike.category as BikeCategory,
          image: finalImageUrl || '',
          stock: Number(newBike.stock),
          description: newBike.description || 'No description available.',
          specs: specsInput ? specsInput.split(',').map(s => s.trim()) : [],
          weight: newBike.weight,
          frameSize: newBike.frameSize
        };

        await onAddProduct(bike);
        setShowAddModal(false);
        
        // Reset Form
        setNewBike({ 
            name: '', 
            price: 0, 
            category: BikeCategory.ROAD, 
            image: '', 
            stock: 0, 
            description: '',
            weight: '',
            frameSize: ''
        });
        setSpecsInput('');
        setImageFile(null);
        setImagePreview(null);
      } catch (error: any) {
        console.error("Dashboard error:", error);
        alert("Failed to save product. " + (error.message || ""));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-forest-900 text-white flex flex-col hidden md:flex shrink-0">
        <div className="p-6">
           <h2 className="text-2xl font-display font-bold tracking-tighter">VELO<span className="text-accent-500">ADMIN</span></h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'inventory' ? 'bg-forest-800 text-white' : 'text-forest-100 hover:bg-forest-800'}`}
          >
            <Package size={20} /> Inventory
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-forest-800 text-white' : 'text-forest-100 hover:bg-forest-800'}`}
          >
            <ShoppingBag size={20} /> Sold Items
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'stats' ? 'bg-forest-800 text-white' : 'text-forest-100 hover:bg-forest-800'}`}
          >
            <TrendingUp size={20} /> Analytics
          </button>
        </nav>
        <div className="p-4 border-t border-forest-800">
          <Link to="/" className="flex items-center gap-2 text-forest-100 hover:text-white transition-colors">
            <LogOut size={18} /> Exit to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full">
        {/* Header mobile */}
        <header className="bg-white shadow-sm p-6 flex justify-between items-center md:hidden sticky top-0 z-20">
           <h2 className="text-xl font-bold text-forest-900">Dashboard</h2>
           <div className="flex gap-4 items-center">
             <Link to="/" className="text-sm text-forest-600">Exit</Link>
             <button onClick={() => setShowAddModal(true)} className="md:hidden bg-accent-500 text-white p-2 rounded-lg"><Plus size={20}/></button>
           </div>
        </header>

        <div className="p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-forest-900 uppercase">
              {activeTab === 'inventory' && 'Product Management'}
              {activeTab === 'stats' && 'Sales Overview'}
              {activeTab === 'orders' && 'Sold Items History'}
            </h1>
            
            <div className="hidden md:flex gap-4">
                {activeTab === 'inventory' && (
                  <Button 
                      onClick={() => setShowAddModal(true)}
                      icon={<Plus size={20} />}
                      className="shadow-lg"
                  >
                      Add Product
                  </Button>
                )}
            </div>
          </div>

          {activeTab === 'inventory' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Product</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map(bike => (
                      <tr key={bike.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 flex items-center gap-4">
                          <img src={bike.image} alt="" className="w-12 h-12 rounded bg-gray-100 object-cover" />
                          <span className="font-bold text-forest-900">{bike.name}</span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 rounded-full bg-forest-50 text-forest-800 text-xs font-bold uppercase">{bike.category}</span>
                        </td>
                        <td className="p-4 font-medium text-forest-900">
                          <div className="flex items-center">
                            <span className="text-gray-400 mr-1">€</span>
                            <input
                              type="number"
                              value={bike.price}
                              min="0"
                              onChange={(e) => onUpdatePrice(bike.id, parseFloat(e.target.value))}
                              className="w-24 bg-transparent border-b border-gray-300 focus:border-accent-500 outline-none font-medium text-forest-900"
                            />
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => onUpdateStock(bike.id, bike.stock - 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-forest-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={bike.stock <= 0}
                            >
                              <Minus size={14} />
                            </button>
                            <span className={`font-bold w-8 text-center ${bike.stock < 5 ? 'text-red-500' : 'text-green-500'}`}>
                              {bike.stock}
                            </span>
                            <button 
                              onClick={() => onUpdateStock(bike.id, bike.stock + 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-forest-900 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => onRemoveProduct(bike.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {products.length === 0 && (
                <div className="p-12 text-center flex flex-col items-center justify-center text-gray-400">
                    <p className="mb-4">No products found in database.</p>
                    <Button 
                        onClick={handleSeedDatabase}
                        isLoading={isSeeding}
                        variant="secondary"
                        icon={<Database size={20} />}
                    >
                        Populate with Demo Data
                    </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[700px]">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Date</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Purchased Items</th>
                      <th className="p-4">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors align-top">
                        <td className="p-4 text-sm text-gray-600">
                          {order.date}
                          <div className="text-xs text-gray-400 mt-1">ID: #{order.id.slice(-6)}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-forest-900">{order.customerName}</div>
                          <div className="text-xs text-gray-500">{order.email}</div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-2">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3">
                                <img src={item.image} alt="" className="w-8 h-8 rounded object-cover bg-gray-100" />
                                <div>
                                  <div className="text-sm font-medium text-forest-900">{item.name}</div>
                                  <div className="text-xs text-gray-500">Qty: {item.quantity} × €{item.price.toLocaleString()}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 font-bold text-forest-900">
                          €{order.total.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {orders.length === 0 && (
                <div className="p-12 text-center flex flex-col items-center justify-center text-gray-400">
                  <ShoppingBag size={48} className="text-gray-200 mb-4" />
                  <p className="text-lg font-medium text-gray-500">No sales yet.</p>
                  <p className="text-sm">Orders will appear here once customers checkout.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[500px]">
              <h3 className="text-lg font-bold text-forest-900 mb-6">Monthly Revenue</h3>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={THEME_COLORS.chart.grid} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: THEME_COLORS.chart.text}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: THEME_COLORS.chart.text}} tickFormatter={(val) => `€${val}`} />
                  <Tooltip 
                    cursor={{fill: '#f3f4f6'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                  />
                  <Bar dataKey="sales" fill={THEME_COLORS.chart.primary} radius={[4, 4, 0, 0]}>
                    {salesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? THEME_COLORS.chart.primary : THEME_COLORS.chart.secondary} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-forest-900">Add New Bike</h2>
              <button onClick={() => setShowAddModal(false)}><Trash2 className="rotate-45" size={24} /></button>
            </div>
            
            {storageError && (
              <div className="m-6 mb-0 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
                  <div className="text-sm text-red-700">
                    <p className="font-bold mb-1">Storage Permission Denied</p>
                    <p>Firebase Storage Rules are blocking this upload. You need to update your rules in the Firebase Console.</p>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-3 overflow-x-auto relative group">
                  <p className="text-gray-400 text-xs font-mono mb-2">// Copy these rules to Firebase Console &gt; Storage &gt; Rules</p>
                  <pre className="text-xs font-mono text-green-400 leading-relaxed">
{`rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}`}
                  </pre>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`rules_version = '2';\nservice firebase.storage {\n  match /b/{bucket}/o {\n    match /{allPaths=**} {\n      allow read, write: if request.auth != null;\n    }\n  }\n}`);
                      alert("Rules copied to clipboard!");
                    }}
                    className="absolute top-2 right-2 p-2 bg-white/10 hover:bg-white/20 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Copy to Clipboard"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Input 
                  label="Bike Name"
                  placeholder="e.g. Speedster 3000"
                  required
                  value={newBike.name} 
                  onChange={e => setNewBike({...newBike, name: e.target.value})}
                />
                
                <Input 
                    as="select"
                    label="Category"
                    value={newBike.category} 
                    onChange={e => setNewBike({...newBike, category: e.target.value as BikeCategory})}
                >
                    {Object.values(BikeCategory).map(c => <option key={c} value={c}>{c}</option>)}
                </Input>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <Input 
                  label="Price (€)"
                  type="number"
                  required
                  value={newBike.price} 
                  onChange={e => setNewBike({...newBike, price: Number(e.target.value)})}
                />
                <Input 
                  label="Stock Qty"
                  type="number"
                  required
                  value={newBike.stock} 
                  onChange={e => setNewBike({...newBike, stock: Number(e.target.value)})}
                />
              </div>

              {/* Weight and Size Row */}
              <div className="grid grid-cols-2 gap-6">
                <Input 
                  label="Weight"
                  placeholder="e.g. 8.5 kg"
                  value={newBike.weight} 
                  onChange={e => setNewBike({...newBike, weight: e.target.value})}
                />
                <Input 
                  label="Frame Size"
                  placeholder="e.g. 54cm / Medium"
                  value={newBike.frameSize} 
                  onChange={e => setNewBike({...newBike, frameSize: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-forest-900 mb-2">Product Image</label>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="h-40 object-contain rounded-md" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-bold opacity-0 hover:opacity-100 transition-opacity rounded-md">
                        Change Image
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400">
                      <ImageIcon className="mx-auto mb-2" size={32} />
                      <p className="font-medium">Click to upload image</p>
                      <p className="text-xs">or drag and drop here</p>
                    </div>
                  )}
                </div>

                {/* Optional URL Input Fallback */}
                <div className="mt-2 flex items-center gap-2">
                   <span className="text-xs text-gray-400 font-bold uppercase">OR</span>
                   <input 
                    type="url" 
                    value={newBike.image} 
                    onChange={e => {
                        setNewBike({...newBike, image: e.target.value});
                        setImagePreview(null);
                        setImageFile(null);
                    }}
                    className="flex-1 p-2 bg-white text-sm text-forest-900 border border-gray-200 rounded-lg outline-none placeholder-gray-400"
                    placeholder="Paste Image URL manually"
                  />
                </div>
              </div>

              <Input 
                label="Tech Specs (Comma separated)"
                placeholder="Carbon Frame, Hydraulic Brakes, 2kg"
                value={specsInput} 
                onChange={e => setSpecsInput(e.target.value)}
              />

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-forest-900">Description</label>
                </div>
                <Input 
                  as="textarea"
                  rows={3} 
                  required
                  value={newBike.description} 
                  onChange={e => setNewBike({...newBike, description: e.target.value})}
                />
              </div>

              <div className="pt-4 flex justify-end gap-4">
                <Button 
                    type="button" 
                    variant="ghost"
                    onClick={() => setShowAddModal(false)}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button 
                    type="submit"
                    isLoading={isSubmitting}
                    icon={imageFile ? <Upload size={20} /> : <Plus size={20} />}
                >
                    Add Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;