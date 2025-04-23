import React from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from '../components/products/ProductCard';

const ProductsPage: React.FC = () => {
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
            Our Product Range
          </motion.h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="mb-12 max-w-3xl mx-auto text-center">
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We offer a variety of premium crystal ice products to suit all your cooling needs. 
            From crystal clear ice cubes to crushed ice and specialty shapes, we have you covered.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;