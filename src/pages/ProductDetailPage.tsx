import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/timeUtils';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const productId = parseInt(id || '0', 10);
  const product = products.find(p => p.id === productId);
  
  const [selectedSize, setSelectedSize] = React.useState('');
  const [quantity, setQuantity] = React.useState(1);
  
  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0].size);
    }
  }, [product]);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
        <Button variant="primary" onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity,
      size: selectedSize,
    });
    navigate('/cart');
  };
  
  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <motion.button
          onClick={() => navigate('/products')}
          className="flex items-center mb-8 text-ice-primary hover:text-ice-dark transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </motion.button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-80 object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 h-full">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-ice-primary font-semibold mb-4">
                {formatPrice(product.price)}
              </p>
              
              <div className="mb-6">
                <p className="text-gray-600">{product.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Select Size</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {product.sizes.map((size) => (
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
              
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-2">Quantity</h3>
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
              </div>
              
              <Button
                variant="primary"
                size="lg"
                fullWidth
                icon={<ShoppingBag className="h-5 w-5" />}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;