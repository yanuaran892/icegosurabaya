import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, Phone, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { DeliveryInfo } from '../../types';
import { formatPrice } from '../../utils/timeUtils';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';

const CheckoutForm: React.FC = () => {
  const navigate = useNavigate();
  const { items, getProductById, getSizePrice, getCartTotal, clearCart } = useCart();
  
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    address: '',
    contactNumber: '',
    deliveryTime: '',
    notes: '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [errors, setErrors] = useState({
    address: '',
    contactNumber: '',
    deliveryTime: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const validateForm = (): boolean => {
    const newErrors = {
      address: '',
      contactNumber: '',
      deliveryTime: '',
    };
    
    if (!deliveryInfo.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }
    
    if (!deliveryInfo.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\+?[0-9]{10,14}$/.test(deliveryInfo.contactNumber.replace(/\s/g, ''))) {
      newErrors.contactNumber = 'Please enter a valid phone number';
    }
    
    if (!deliveryInfo.deliveryTime) {
      newErrors.deliveryTime = 'Please select a delivery time';
    }
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Process order - In a real app, this would send data to a backend
    // For demonstration, we'll just show a success page
    clearCart();
    navigate('/order-success');
  };
  
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">Add some items to your cart to proceed to checkout</p>
        <Button variant="primary" onClick={() => navigate('/products')}>
          Browse Products
        </Button>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="md:col-span-1">
            <Card className="p-4 mb-4">
              <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                {items.map((item) => {
                  const product = getProductById(item.productId);
                  if (!product) return null;
                  
                  const price = getSizePrice(product, item.size);
                  
                  return (
                    <div key={`${item.productId}-${item.size}`} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-gray-500">{item.size} x {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">{formatPrice(price * item.quantity)}</p>
                    </div>
                  );
                })}
                
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center font-medium">
                    <p>Total</p>
                    <p className="text-ice-primary">{formatPrice(getCartTotal())}</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <h2 className="font-semibold text-gray-900 mb-4">Delivery Information</h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Truck className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p>Free delivery for orders above Rp 50,000</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p>Delivery within 1 hour in city center</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p>You will receive an SMS when your order is on the way</p>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <Card className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Details</h3>
                    <div className="space-y-4">
                      <Input
                        label="Full Address"
                        name="address"
                        placeholder="Enter your full delivery address"
                        value={deliveryInfo.address}
                        onChange={handleChange}
                        error={errors.address}
                        fullWidth
                        required
                      />
                      
                      <Input
                        label="Contact Number"
                        name="contactNumber"
                        placeholder="e.g., +62 812 3456 7890"
                        value={deliveryInfo.contactNumber}
                        onChange={handleChange}
                        error={errors.contactNumber}
                        fullWidth
                        required
                      />
                      
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Preferred Delivery Time
                        </label>
                        <select
                          name="deliveryTime"
                          value={deliveryInfo.deliveryTime}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-ice-primary focus:outline-none focus:ring-1 focus:ring-ice-primary"
                        >
                          <option value="">Select a time</option>
                          <option value="asap">As soon as possible</option>
                          <option value="morning">Morning (7:00 - 12:00)</option>
                          <option value="afternoon">Afternoon (12:00 - 17:00)</option>
                          <option value="evening">Evening (17:00 - 22:00)</option>
                        </select>
                        {errors.deliveryTime && (
                          <p className="mt-1 text-xs text-red-500">{errors.deliveryTime}</p>
                        )}
                      </div>
                      
                      <div>
                        <label 
                          htmlFor="notes" 
                          className="block mb-1 text-sm font-medium text-gray-700"
                        >
                          Delivery Notes (Optional)
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          rows={3}
                          placeholder="Any special instructions for delivery..."
                          value={deliveryInfo.notes}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-ice-primary focus:outline-none focus:ring-1 focus:ring-ice-primary"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          id="payment-cash"
                          name="paymentMethod"
                          type="radio"
                          checked={paymentMethod === 'cash'}
                          onChange={() => setPaymentMethod('cash')}
                          className="h-4 w-4 text-ice-primary focus:ring-ice-primary"
                        />
                        <label htmlFor="payment-cash" className="ml-3 block text-sm font-medium text-gray-700">
                          Cash on Delivery
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="payment-transfer"
                          name="paymentMethod"
                          type="radio"
                          checked={paymentMethod === 'transfer'}
                          onChange={() => setPaymentMethod('transfer')}
                          className="h-4 w-4 text-ice-primary focus:ring-ice-primary"
                        />
                        <label htmlFor="payment-transfer" className="ml-3 block text-sm font-medium text-gray-700">
                          Bank Transfer
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      icon={<CreditCard className="h-5 w-5" />}
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutForm;