import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Users, ThumbsUp } from 'lucide-react';
import Card from '../components/ui/Card';

const AboutPage: React.FC = () => {
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
            About Ice Go
          </motion.h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <div className="prose prose-lg text-gray-600">
              <p>
              Toko Kami didirikan pada tahun 2024 dengan misi sederhana: menyediakan es kristal berkualitas tinggi untuk rumah dan bisnis. 
              Apa yang dimulai sebagai operasi keluarga kecil dengan cepat berkembang menjadi layanan pengiriman es paling andal di kota ini.
              </p>
              <p>
              Kami bangga dengan es jernih kami yang sempurna untuk segala acara, mulai dari pertemuan keluarga hingga acara kelas atas 
              dan persyaratan bisnis. Komitmen kami terhadap kualitas dan layanan telah menjadikan kami sebagai pemasok es pilihan di wilayah ini.
              </p>
              <p>
              Saat ini, Ice Go melayani ratusan pelanggan setiap hari dengan pengiriman yang cepat dan layanan pelanggan yang luar biasa. 
              Kami terus berinovasi dan meningkatkan produk dan layanan kami untuk memenuhi kebutuhan pelanggan yang terus berkembang.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <img 
              src="https://images.pexels.com/photos/533847/pexels-photo-533847.jpeg" 
              alt="Ice Manufacturing" 
              className="rounded-xl shadow-xl max-h-96 object-cover"
            />
          </motion.div>
        </div>
        
        <div className="mb-16">
          <div className="text-center mb-10">
            <motion.h2 
              className="text-2xl font-bold text-gray-900 mb-3"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Kenapa Pilih Kita
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Di Ice Go, kami berkomitmen untuk menjadi yang terbaik dalam setiap aspek bisnis kami
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Award className="h-8 w-8 text-ice-primary" />,
                title: "Premium Quality",
                description: "Es kami sangat jernih dan murni, terbuat dari air yang telah disaring dan teknik pembekuan yang lambat"
              },
              {
                icon: <Clock className="h-8 w-8 text-ice-primary" />,
                title: "Fast Delivery",
                description: "Kami menjamin pengiriman dalam waktu 1 jam sejak pemesanan dilakukan di area layanan kami"
              },
              {
                icon: <Users className="h-8 w-8 text-ice-primary" />,
                title: "Customer Service",
                description: "Tim kami yang ramah selalu siap membantu dengan pertanyaan atau permintaan khusus"
              },
              {
                icon: <ThumbsUp className="h-8 w-8 text-ice-primary" />,
                title: "Reliability",
                description: "Andalkan kami untuk kualitas yang konsisten dan pengiriman tepat waktu, setiap kali Anda memesan"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-ice-light rounded-full">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mb-16">
          <div className="text-center mb-10">
            <motion.h2 
              className="text-2xl font-bold text-gray-900 mb-3"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Process
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Bagaimana kami menciptakan es yang sempurna untuk kebutuhan Anda
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Penjernihan",
                description: "Kami mulai dengan air yang disaring tiga kali untuk menghilangkan kotoran dan memastikan kejernihannya"
              },
              {
                number: "02",
                title: "Tahan Lama",
                description: "Proses pembekuan khusus kami menghasilkan es yang padat dan jernih yang mencair secara perlahan"
              },
              {
                number: "03",
                title: "Quality Control",
                description: "Setiap batch diperiksa untuk memastikannya memenuhi standar tinggi kami sebelum pengemasan"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full relative overflow-hidden">
                  <span className="absolute -top-6 -right-6 text-8xl font-bold text-ice-light z-0">
                    {step.number}
                  </span>
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;