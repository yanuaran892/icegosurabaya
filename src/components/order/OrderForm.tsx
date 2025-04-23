import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Truck, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { formatPrice, getDeliveryTimeOptions, isStoreOpen } from '../../utils/timeUtils';
import { products } from '../../data/products';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';

const OrderForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addItem } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedSize, setSelectedSize] = useState(products[0].sizes[0].size);
  const [quantity, setQuantity] = useState(1);
  const [deliveryTimeOptions, setDeliveryTimeOptions] = useState<string[]>([]);
  const [deliveryTime, setDeliveryTime] = useState('');
  const [formErrors, setFormErrors] = useState({
    product: '',
    quantity: '',
    deliveryTime: '',
  });
  
  // Check if the store is open
  const storeOpen = isStoreOpen();
  
  // Update delivery time options
  useEffect(() => {
    if (storeOpen) {
      const options = getDeliveryTimeOptions();
      setDeliveryTimeOptions(options);
      if (options.length > 0) {
        setDeliveryTime(options[0]);
      }
    }
  }, [storeOpen]);
  
  // Set selected product from URL param
  useEffect(() => {
    const productId = searchParams.get('product');
    if (productId) {
      const product = products.find(p => p.id === parseInt(productId, 10));
      if (product) {
        setSelectedProduct(product);
        setSelectedSize(product.sizes[0].size);
      }
    }
  }, [searchParams]);
  
  const getProductPrice = (): number => {
    const sizeObj = selectedProduct.sizes.find(s => s.size === selectedSize);
    return sizeObj ? sizeObj.price : selectedProduct.price;
  };
  
  const getTotalPrice = (): number => {
    return getProductPrice() * quantity;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = {
      product: '',
      quantity: '',
      deliveryTime: '',
    };
    
    if (quantity <= 0) {
      errors.quantity = 'Quantity must be at least 1';
    }
    
    if (!deliveryTime && storeOpen) {
      errors.deliveryTime = 'Please select a delivery time';
    }
    
    setFormErrors(errors);
    
    // If there are errors, don't proceed
    if (Object.values(errors).some(error => error !== '')) {
      return;
    }
    
    // Add to cart and navigate to cart page
    addItem({
      productId: selectedProduct.id,
      quantity,
      size: selectedSize,
    });
    
    navigate('/cart');
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Place Your Order</h2>
        
        {!storeOpen && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-amber-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-amber-700">
                  We're currently closed. Operating hours are from 7:00 AM to 10:00 PM.
                  You can still place an order, but it will be delivered when we open.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Product Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Product
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedProduct.id === product.id
                        ? 'border-ice-primary bg-ice-light/30'
                        : 'border-gray-200 hover:border-ice-primary/50'
                    }`}
                    onClick={() => {
                      setSelectedProduct(product);
                      setSelectedSize(product.sizes[0].size);
                    }}
                  >
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">From {formatPrice(product.price)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {formErrors.product && (
                <p className="mt-1 text-sm text-red-600">{formErrors.product}</p>
              )}
            </div>
            
            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Size
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedProduct.sizes.map((size) => (
                  <div
                    key={size.size}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedSize === size.size
                        ? 'border-ice-primary bg-ice-light/30'
                        : 'border-gray-200 hover:border-ice-primary/50'
                    }`}
                    onClick={() => setSelectedSize(size.size)}
                  >
                    <p className="font-medium text-gray-900">{size.size}</p>
                    <p className="text-sm text-gray-500">{formatPrice(size.price)}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div>
              <label 
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  className="p-2 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
                  className="p-2 border-y border-gray-300 text-center w-16"
                />
                <button
                  type="button"
                  className="p-2 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              {formErrors.quantity && (
                <p className="mt-1 text-sm text-red-600">{formErrors.quantity}</p>
              )}
            </div>
            
            {/* Delivery Time */}
            {storeOpen && (
              <div>
                <label
                  htmlFor="deliveryTime"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Delivery Time
                </label>
                <select
                  id="deliveryTime"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:ring-ice-primary focus:border-ice-primary"
                >
                  {deliveryTimeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {formErrors.deliveryTime && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.deliveryTime}</p>
                )}
              </div>
            )}
            
            {/* Order Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Order Summary</h3>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Product:</span>
                <span className="text-gray-900">{selectedProduct.name} ({selectedSize})</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Price per unit:</span>
                <span className="text-gray-900">{formatPrice(getProductPrice())}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Quantity:</span>
                <span className="text-gray-900">{quantity}</span>
              </div>
              <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-medium">
                <span>Total:</span>
                <span className="text-ice-primary">{formatPrice(getTotalPrice())}</span>
              </div>
            </div>
            
            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              icon={<Truck className="h-5 w-5" />}
            >
              Add to Cart
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default OrderForm;