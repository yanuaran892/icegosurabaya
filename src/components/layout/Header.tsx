import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, IceCream2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getItemCount } = useCart();
  
  const itemCount = getItemCount();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Produk', path: '/products' },
    { name: 'Pesan Online', path: '/order' },
    { name: 'Tentang', path: '/about' },
    { name: 'Kontak', path: '/contact' },
  ];
  
  const headerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;
  
  const logoColors = isScrolled ? 'text-ice-primary' : 'text-white';
  const linkColors = isScrolled 
    ? 'text-gray-700 hover:text-ice-primary' 
    : 'text-white hover:text-ice-light';
  
  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <IceCream2 className={`h-8 w-8 mr-2 ${logoColors}`} />
          <span className={`font-bold text-xl ${logoColors}`}>Ice Go</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium transition-colors duration-200 ${linkColors} ${
                isActive(link.path) ? 'border-b-2 border-ice-accent' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <Link to="/cart" className="relative">
            <Button
              variant={isScrolled ? 'primary' : 'ghost'}
              size="sm"
              icon={<ShoppingCart className="h-5 w-5" />}
            >
              Keranjang
            </Button>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Link to="/cart" className="relative mr-4">
            <ShoppingCart className={`h-6 w-6 ${logoColors}`} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-1 ${logoColors}`}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`py-3 font-medium text-gray-700 hover:text-ice-primary ${
                    isActive(link.path) ? 'text-ice-primary' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;