
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicCalculator from './BasicCalculator';
import LoanCalculator from './LoanCalculator';
import InterestCalculator from './InterestCalculator';
import MortgageCalculator from './MortgageCalculator';
import { CalendarDays, Calculator, Percent, Home } from 'lucide-react';

const CalculatorLayout: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Card className="shadow-lg border-finance-muted">
        <CardContent className="p-0">
          <Tabs defaultValue="basic" className="w-full">
            <div className="border-b border-finance-muted">
              <TabsList className="w-full bg-finance-background rounded-none h-14">
                <TabsTrigger 
                  value="basic" 
                  className="flex items-center gap-2 text-sm font-medium h-14 data-[state=active]:text-finance-primary"
                >
                  <Calculator size={18} />
                  <span className="hidden sm:inline">Basic Calculator</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="loan" 
                  className="flex items-center gap-2 text-sm font-medium h-14 data-[state=active]:text-finance-primary"
                >
                  <CalendarDays size={18} />
                  <span className="hidden sm:inline">Loan Calculator</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="interest" 
                  className="flex items-center gap-2 text-sm font-medium h-14 data-[state=active]:text-finance-primary"
                >
                  <Percent size={18} />
                  <span className="hidden sm:inline">Interest Calculator</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="mortgage" 
                  className="flex items-center gap-2 text-sm font-medium h-14 data-[state=active]:text-finance-primary"
                >
                  <Home size={18} />
                  <span className="hidden sm:inline">Mortgage Calculator</span>
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="basic" className="p-0 m-0">
              <BasicCalculator />
            </TabsContent>
            <TabsContent value="loan" className="p-0 m-0">
              <LoanCalculator />
            </TabsContent>
            <TabsContent value="interest" className="p-0 m-0">
              <InterestCalculator />
            </TabsContent>
            <TabsContent value="mortgage" className="p-0 m-0">
              <MortgageCalculator />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalculatorLayout;
