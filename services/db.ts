import { db, storage } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  addDoc, 
  updateDoc,
  getDocs
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { INITIAL_BIKES } from '../constants';
import { Bike, Order } from '../types';

// Explicit collection name as requested
const PRODUCTS_COLLECTION = 'products';
const ORDERS_COLLECTION = 'orders';

/**
 * Helper to remove undefined fields which Firestore rejects.
 * Also ensures data is a plain object.
 */
const sanitizeData = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};

/**
 * Helper to log helpful instructions when permissions fail
 */
const logPermissionError = (operation: string) => {
  console.error(
    `%c🔥 FIREBASE PERMISSION ERROR [${operation}] 🔥\n` +
    `Your Firestore Rules are blocking access.\n` +
    `FOR THE SHOP TO WORK (Public Read, Seller Write):\n` +
    `1. Go to Firebase Console > Firestore Database > Rules\n` +
    `2. Use these rules:\n` +
    `   match /products/{doc} { allow read: if true; allow write: if request.auth != null; }\n` +
    `   match /orders/{doc} { allow read, write: if request.auth != null; }`,
    'color: #ff4444; font-weight: bold; font-size: 14px;'
  );
};

const logStoragePermissionError = () => {
  console.error(
    `%c🔥 FIREBASE STORAGE PERMISSION ERROR 🔥\n` +
    `Your Storage Rules are blocking uploads.\n` +
    `1. Go to Firebase Console > Storage > Rules\n` +
    `2. Use these rules:\n` +
    `   rules_version = '2';\n` +
    `   service firebase.storage {\n` +
    `     match /b/{bucket}/o {\n` +
    `       match /{allPaths=**} {\n` +
    `         allow read, write: if request.auth != null;\n` +
    `       }\n` +
    `     }\n` +
    `   }`,
    'color: #ff4444; font-weight: bold; font-size: 14px;'
  );
};

/**
 * Uploads an image to Firebase Storage and returns the URL
 */
export const uploadProductImage = async (file: File): Promise<string> => {
  try {
    // Create a unique filename: timestamp_originalName
    const filename = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    const storageRef = ref(storage, `product-images/${filename}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error: any) {
    console.error("Error uploading image:", error);
    if (error.code === 'storage/unauthorized') {
      logStoragePermissionError();
      throw new Error("Storage Permission Denied. Please enable Storage Rules in Firebase Console (see browser console).");
    }
    throw new Error("Failed to upload image. " + error.message);
  }
};

/**
 * Uploads all bikes from constants.ts to Firestore.
 */
export const seedDatabase = async () => {
  try {
    const promises = INITIAL_BIKES.map(bike => {
      return setDoc(doc(db, "products", bike.id), sanitizeData(bike));
    });
    await Promise.all(promises);
    return { success: true, message: `Successfully seeded ${INITIAL_BIKES.length} products.` };
  } catch (error: any) {
    if (error.code === 'permission-denied') logPermissionError('Seed DB');
    return { success: false, message: "Failed to seed database." };
  }
};

/**
 * Subscribes to the products collection for real-time updates.
 * NOW EXPLICITLY fetching from .collection("products")
 */
export const subscribeToProducts = (
  onUpdate: (products: Bike[]) => void, 
  onError?: (error: any) => void
) => {
  console.log("Attempting to fetch data from .collection('products')...");
  
  // Explicit usage of "products" string literal
  const productsRef = collection(db, "products");

  return onSnapshot(productsRef, (snapshot) => {
    const products = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id } as Bike;
    });
    console.log(`Snapshot received from 'products' collection. Count: ${products.length}`);
    onUpdate(products);
  }, (error) => {
    if (error.code === 'permission-denied') {
        console.warn("Permission denied for products. Please check Firestore Rules.");
        logPermissionError("Read Products");
        // CRITICAL FIX: Do NOT call onUpdate([]) here. 
        // Calling onUpdate([]) clears the error state in App.tsx. 
        // We want the error to persist so the user sees the banner.
        if (onError) onError(error);
    } else {
        console.error("Firestore read error:", error);
        if (onError) onError(error);
    }
  });
};

/**
 * Manual fetch function using getDocs
 */
export const fetchProducts = async (): Promise<Bike[]> => {
    try {
        console.log("Fetching data via getDocs from 'products'...");
        const snapshot = await getDocs(collection(db, "products"));
        return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Bike));
    } catch (error: any) {
        if (error.code === 'permission-denied') logPermissionError('Fetch Products');
        throw error;
    }
}

/**
 * Add a new product to Firestore with robust error handling
 */
export const addProductToDb = async (bike: Bike) => {
  try {
    const cleanBike = sanitizeData(bike);
    
    // Ensure we have a valid ID.
    if (cleanBike.id) {
      await setDoc(doc(db, "products", cleanBike.id), cleanBike);
    } else {
      await addDoc(collection(db, "products"), cleanBike);
    }
    console.log("Product added to Firestore successfully.");
  } catch (error: any) {
    if (error.code === 'permission-denied') {
        logPermissionError('Add Product');
    }
    throw error;
  }
};

/**
 * Update an existing product
 */
export const updateProductInDb = async (id: string, data: Partial<Bike>) => {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, sanitizeData(data));
  } catch (error: any) {
    if (error.code === 'permission-denied') logPermissionError('Update Product');
    throw error;
  }
};

/**
 * Delete a product
 */
export const deleteProductFromDb = async (id: string) => {
  try {
    await deleteDoc(doc(db, "products", id));
  } catch (error: any) {
    if (error.code === 'permission-denied') logPermissionError('Delete Product');
    throw error;
  }
};

/**
 * Save a new order
 */
export const saveOrderToDb = async (order: Order) => {
    try {
        const cleanOrder = sanitizeData(order);
        await setDoc(doc(db, ORDERS_COLLECTION, cleanOrder.id), cleanOrder);
    } catch (error: any) {
        throw error;
    }
};

export const subscribeToOrders = (onUpdate: (orders: Order[]) => void) => {
    return onSnapshot(collection(db, ORDERS_COLLECTION), (snapshot) => {
      const orders = snapshot.docs.map(doc => doc.data() as Order);
      onUpdate(orders.sort((a, b) => Number(b.id) - Number(a.id)));
    }, (error) => {
      if (error.code === 'permission-denied') {
        onUpdate([]); // Guest user sees no orders
      }
    });
  };