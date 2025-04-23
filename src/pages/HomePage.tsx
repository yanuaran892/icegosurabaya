import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import ProductShowcase from '../components/home/ProductShowcase';
import CallToAction from '../components/home/CallToAction';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <Features />
      <ProductShowcase />
      <CallToAction />
    </div>
  );
};

export default HomePage;