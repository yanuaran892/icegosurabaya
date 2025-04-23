import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [formSuccess, setFormSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validateForm = (): boolean => {
    const errors = {
      name: '',
      email: '',
      message: '',
    };
    let isValid = true;
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would send the form data to a server
      console.log('Form submitted:', formData);
      setFormSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormSuccess(false);
      }, 5000);
    }
  };
  
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
            Contact Us
          </motion.h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Have questions about our products or services? Need to place a bulk order?
            We're here to help. Reach out to us through any of the methods below.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <MapPin className="h-6 w-6 text-ice-primary" />,
              title: "Our Location",
              details: ["Jl. Pemuda No. 123", "Jakarta Timur", "Indonesia 13250"]
            },
            {
              icon: <Phone className="h-6 w-6 text-ice-primary" />,
              title: "Phone & WhatsApp",
              details: ["+62 812 3456 7890", "+62 878 9012 3456"]
            },
            {
              icon: <Clock className="h-6 w-6 text-ice-primary" />,
              title: "Operating Hours",
              details: ["7:00 AM - 10:00 PM", "Setiap Hari Buka"]
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center h-full">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-ice-light rounded-full">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <div className="text-gray-600">
                  {item.details.map((detail, i) => (
                    <p key={i} className="mb-1">{detail}</p>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 h-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              {formSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md text-green-700">
                  Your message has been sent successfully. We'll get back to you soon!
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <Input 
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={formErrors.name}
                    fullWidth
                    required
                  />
                  
                  <Input 
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={formErrors.email}
                    fullWidth
                    required
                  />
                  
                  <Input 
                    label="Phone Number (Optional)"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                  />
                  
                  <div>
                    <label 
                      htmlFor="message" 
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full rounded-md border ${
                        formErrors.message ? 'border-red-500' : 'border-gray-300'
                      } bg-white px-3 py-2 text-gray-900 focus:border-ice-primary focus:outline-none focus:ring-1 focus:ring-ice-primary`}
                      required
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-xs text-red-500">{formErrors.message}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    icon={<Send className="h-5 w-5" />}
                    fullWidth
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="rounded-xl overflow-hidden h-full shadow-xl">
              <img 
                src="https://images.pexels.com/photos/1170583/pexels-photo-1170583.jpeg" 
                alt="Ice Cubes" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;