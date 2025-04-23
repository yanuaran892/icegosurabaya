import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Home } from 'lucide-react';
import Button from '../components/ui/Button';

const OrderSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Generate a random order number
  const orderNumber = React.useMemo(() => {
    return `ICE-${Math.floor(100000 + Math.random() * 900000)}`;
  }, []);
  
  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-2xl mx-auto text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Sukses!</h1>
          <p className="text-gray-600 mb-6">
          Terima kasih atas pesanan Anda. Kami telah menerima permintaan Anda dan akan segera mengirimkan produk es Anda.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="font-medium text-gray-700 mb-2">Order Reference</p>
            <p className="text-2xl font-bold text-ice-primary">{orderNumber}</p>
            <p className="text-sm text-gray-500 mt-2">
            Harap simpan referensi ini untuk melacak pesanan Anda
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="primary" 
              icon={<Home className="h-5 w-5" />}
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
            <Button 
              variant="outline" 
              className="border-ice-primary"
              onClick={() => navigate('/products')}
            >
              Order More
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;