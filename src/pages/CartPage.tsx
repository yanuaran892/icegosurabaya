import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/timeUtils';
import CartItem from '../components/cart/CartItem';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  
  const isEmpty = items.length === 0;
  
  return (
    <div className="pt-20 pb-16">
      <div className="bg-ice-primary py-12 mb-12">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-3xl font-bold text-white text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Cart
          </motion.h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isEmpty ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-ice-light rounded-full">
                  <ShoppingBag className="h-12 w-12 text-ice-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet</p>
              <Button variant="primary" onClick={() => navigate('/products')}>
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card className="p-6">
                  <h2 className="font-bold text-xl text-gray-900 mb-6">Cart Items</h2>
                  <div>
                    {items.map((item) => (
                      <CartItem key={`${item.productId}-${item.size}`} item={item} />
                    ))}
                  </div>
                  
                  <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                    <Button
                      variant="ghost"
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      Clear Cart
                    </Button>
                    <Button
                      variant="outline" 
                      onClick={() => navigate('/products')}
                      className="border-ice-primary"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </Card>
              </div>
              
              <div className="md:col-span-1">
                <Card className="p-6">
                  <h2 className="font-bold text-xl text-gray-900 mb-6">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatPrice(getCartTotal())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="font-medium">Free</span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-gray-200">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-ice-primary">{formatPrice(getCartTotal())}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      icon={<ArrowRight className="h-5 w-5" />}
                      onClick={() => navigate('/checkout')}
                    >
                      Proceed to Checkout
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Delivery available from 7:00 AM to 10:00 PM
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;