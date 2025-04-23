import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Phone, Mail, IceCream2, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-ice-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and About */}
          <div>
            <div className="flex items-center mb-4">
              <IceCream2 className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">Ice Go</span>
            </div>
            <p className="text-ice-light mb-4">
              Layanan pengiriman es batu kristal premium. Kami mengirimkan produk es berkualitas tinggi ke lokasi Anda.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-ice-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-ice-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-ice-accent transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-ice-light hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-ice-light hover:text-white transition-colors">
                  Produk Kami
                </Link>
              </li>
              <li>
                <Link to="/order" className="text-ice-light hover:text-white transition-colors">
                  Pesan Online
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-ice-light hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-ice-light hover:text-white transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Business Hours */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Jam Operasional</h3>
            <div className="flex items-start space-x-2 mb-2">
              <Clock className="h-5 w-5 text-ice-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">Jam Buka</p>
                <p className="text-ice-light">07:00 - 21:30</p>
                <p className="text-ice-light">Setiap hari</p>
              </div>
            </div>
            <p className="text-sm text-ice-light mt-4">
              * Pesanan setelah jam 21:00 akan dikirim keesokan harinya.
            </p>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Hubungi Kami</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Phone className="h-5 w-5 text-ice-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Telepon</p>
                  <p className="text-ice-light">+62 812 3456 7890</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="h-5 w-5 text-ice-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-ice-light">halo@icego.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-ice-primary/30 mt-8 pt-6 text-center">
          <p className="text-ice-light text-sm">
            &copy; {currentYear} Ice Go. Hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;