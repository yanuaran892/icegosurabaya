import React from 'react';
import { motion } from 'framer-motion';
import CheckoutForm from '../components/checkout/CheckoutForm';

const CheckoutPage: React.FC = () => {
  return (
    <div className="pt-20 pb-16">
      <div className="bg-ice-primary py-8 mb-8">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-2xl font-bold text-white text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Checkout
          </motion.h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <CheckoutForm />
      </div>
    </div>
  );
};

export default CheckoutPage;