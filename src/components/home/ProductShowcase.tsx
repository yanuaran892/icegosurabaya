import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { formatPrice } from '../../utils/timeUtils';

const ProductShowcase: React.FC = () => {
  // Display only the first 3 products
  const showcaseProducts = products.slice(0, 3);
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Premium Products
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We offer a variety of high-quality ice products to meet all your cooling needs.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcaseProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to={`/products/${product.id}`}>
                      <Button variant="primary">View Details</Button>
                    </Link>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-ice-primary font-bold">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-gray-500">per pack</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/products">
            <Button 
              variant="outline" 
              icon={<ArrowRight className="h-5 w-5" />}
              className="border-ice-primary"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;