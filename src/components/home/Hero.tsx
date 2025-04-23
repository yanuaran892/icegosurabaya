import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-ice-dark to-ice-primary text-white pt-24 pb-16 md:pb-24 overflow-hidden">
      {/* Background ice cube animation effects */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 md:w-64 md:h-64 bg-white/5 backdrop-blur-sm rounded-xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 20, 0],
              rotate: [0, 5, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Es Batu Kristal Premium
            <span className="block text-ice-accent">Diantar ke Lokasi Anda</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-ice-light mb-8 mx-auto max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Es batu kristal jernih diantar langsung ke rumah atau bisnis Anda dari jam 07:00 sampai 21:30 setiap hari.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/order">
              <Button 
                variant="secondary" 
                size="lg"
                icon={<ArrowRight className="h-5 w-5" />}
              >
                Pesan Sekarang
              </Button>
            </Link>
            <Link to="/products">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                Lihat Produk
              </Button>
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative rounded-xl overflow-hidden w-full max-w-4xl shadow-2xl">
            <img 
              src="https://images.pexels.com/photos/1397269/pexels-photo-1397269.jpeg" 
              alt="Es Batu Kristal" 
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ice-dark/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium text-lg md:text-xl">Pack Standar</p>
                  <p className="text-ice-light">Es batu kristal jernih</p>
                </div>
                <div className="bg-ice-accent text-white px-3 py-1 rounded-full font-bold">
                  Rp 6.000
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;