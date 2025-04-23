import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-ice-gradient relative overflow-hidden">
      {/* Ice cube animations */}
      <div className="absolute inset-0 z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 md:w-24 md:h-24 bg-white rounded-md opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              rotate: Math.random() * 45,
            }}
            animate={{
              y: [0, 30, 0],
              rotate: [0, 10, 0],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-xl p-8 md:p-12 max-w-4xl mx-auto shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-10 flex-shrink-0">
              <div className="bg-ice-light p-5 rounded-full">
                <Phone className="h-12 w-12 text-ice-primary" />
              </div>
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Need Ice for Your Event?
              </h2>
              <p className="text-gray-600 mb-6 md:mb-0 md:pr-8">
                We offer special pricing for events and bulk orders. Contact us today to discuss your needs or place an order for immediate delivery.
              </p>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Link to="/order">
                <Button 
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  Order Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  className="border-ice-primary"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;