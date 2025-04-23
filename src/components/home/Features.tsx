import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, Snowflake, Award } from 'lucide-react';
import Card from '../ui/Card';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureItem: React.FC<FeatureProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="h-full p-6">
        <div className="bg-ice-light text-ice-primary p-3 rounded-full w-fit mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </Card>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Pengiriman Cepat",
      description: "Kami mengirim ke lokasi Anda dalam waktu 1 jam setelah pemesanan.",
      delay: 0.1
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Jam Operasional",
      description: "Buka dari jam 07:00 sampai 21:30 setiap hari untuk kenyamanan Anda.",
      delay: 0.2
    },
    {
      icon: <Snowflake className="h-6 w-6" />,
      title: "Kualitas Premium",
      description: "Es kristal jernih yang mencair perlahan dan tidak mengencerkan minuman Anda.",
      delay: 0.3
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Jaminan Kepuasan",
      description: "Tidak puas? Kami akan mengganti pesanan Anda atau mengembalikan uang Anda.",
      delay: 0.4
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Mengapa Memilih <span className="text-ice-primary">Ice Go</span>
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Kami menyediakan produk es berkualitas tinggi dengan layanan yang andal untuk memenuhi kebutuhan acara dan bisnis Anda.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;