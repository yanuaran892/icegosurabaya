import React from 'react';
import { motion } from 'framer-motion';
import OrderForm from '../components/order/OrderForm';

const OrderPage: React.FC = () => {
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
            Order Online
          </motion.h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Pilih produk es yang Anda inginkan, tentukan jumlahnya, dan kami akan mengantarkannya ke depan pintu rumah Anda. 
            Kami beroperasi dari pukul 07.00 hingga 22.00 setiap hari.
          </motion.p>
        </div>
        
        <OrderForm />
      </div>
    </div>
  );
};

export default OrderPage;