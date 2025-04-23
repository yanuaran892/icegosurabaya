import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { OrderItem, Product } from '../types';
import { products } from '../data/products';

interface CartContextType {
  items: OrderItem[];
  addItem: (item: OrderItem) => void;
  removeItem: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
  getProductById: (id: number) => Product | undefined;
  getSizePrice: (product: Product, size: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<OrderItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('iceGoCart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse saved cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem('iceGoCart', JSON.stringify(items));
  }, [items]);

  const getProductById = (id: number): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const getSizePrice = (product: Product, size: string): number => {
    const sizeObj = product.sizes.find(s => s.size === size);
    return sizeObj ? sizeObj.price : product.price;
  };

  const addItem = (newItem: OrderItem) => {
    setItems(currentItems => {
      // Check if this product+size already exists
      const existingItemIndex = currentItems.findIndex(
        item => item.productId === newItem.productId && item.size === newItem.size
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...currentItems, newItem];
      }
    });
  };

  const removeItem = (productId: number, size: string) => {
    setItems(currentItems => 
      currentItems.filter(item => !(item.productId === productId && item.size === size))
    );
  };

  const updateQuantity = (productId: number, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size);
      return;
    }

    setItems(currentItems => 
      currentItems.map(item => 
        item.productId === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = (): number => {
    return items.reduce((total, item) => {
      const product = getProductById(item.productId);
      if (!product) return total;
      
      const price = getSizePrice(product, item.size);
      return total + (price * item.quantity);
    }, 0);
  };

  const getItemCount = (): number => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getCartTotal,
      getItemCount,
      getProductById,
      getSizePrice,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};