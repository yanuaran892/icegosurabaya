import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { formatPrice } from '../../utils/timeUtils';

interface ProductCardProps {
  product: Product;
  delay?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="h-full overflow-hidden group">
        <div className="relative h-60 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link to={`/products/${product.id}`}>
              <Button variant="primary">View Details</Button>
            </Link>
          </div>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
            <span className="bg-ice-primary text-white px-2 py-1 rounded-md text-sm font-semibold">
              {formatPrice(product.price)}
            </span>
          </div>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="mt-auto">
            <Link to={`/order?product=${product.id}`}>
              <Button 
                variant="secondary" 
                fullWidth
                icon={<ShoppingBag className="h-5 w-5" />}
              >
                Order Now
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;