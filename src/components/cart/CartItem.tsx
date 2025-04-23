import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { OrderItem } from '../../types';
import { formatPrice } from '../../utils/timeUtils';

interface CartItemProps {
  item: OrderItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { getProductById, getSizePrice, updateQuantity, removeItem } = useCart();
  
  const product = getProductById(item.productId);
  
  if (!product) {
    return null;
  }
  
  const itemPrice = getSizePrice(product, item.size);
  const totalPrice = itemPrice * item.quantity;
  
  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <h3 className="font-medium text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500">{item.size}</p>
        <p className="text-sm text-gray-500">{formatPrice(itemPrice)} per pack</p>
      </div>
      
      <div className="flex items-center ml-4">
        <button
          type="button"
          className="p-1 text-gray-500 hover:text-gray-700"
          onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="mx-2 w-8 text-center">{item.quantity}</span>
        <button
          type="button"
          className="p-1 text-gray-500 hover:text-gray-700"
          onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      
      <div className="ml-4 w-24 text-right">
        <p className="font-medium text-gray-900">{formatPrice(totalPrice)}</p>
      </div>
      
      <button
        type="button"
        className="ml-4 p-1 text-gray-400 hover:text-red-500"
        onClick={() => removeItem(item.productId, item.size)}
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CartItem;