
import React from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-finance-background to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-finance-text mb-2">Financial Calculator</h1>
          <p className="text-finance-text-light max-w-2xl mx-auto">
            A powerful calculator for all your financial needs. Perform basic calculations, 
            estimate loan payments, and calculate compound interest.
          </p>
        </header>
        
        <main className="animate-fade-in">
          <CalculatorLayout />
        </main>
        
        <footer className="mt-12 text-center text-finance-text-light text-sm">
          <p>© 2025 Financial Calculator | Built with Lovable</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
