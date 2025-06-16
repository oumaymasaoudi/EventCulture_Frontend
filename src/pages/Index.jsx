
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import EventsSection from '@/components/EventsSection';
import ParcoursSection from '@/components/ParcoursSection';
import QRCodeSection from '@/components/QRCodeSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <EventsSection />
      <ParcoursSection />
      <QRCodeSection />
      <Footer />
    </div>
  );
};

export default Index;
