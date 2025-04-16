
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown } from 'lucide-react';

const MortgageCalculator: React.FC = () => {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(4.5);
  const [propertyTax, setPropertyTax] = useState(1.25);
  const [homeInsurance, setHomeInsurance] = useState(1200);
  const [monthlyPayment, setMonthlyPayment] = useState({
    principal: 0,
    tax: 0,
    insurance: 0,
    total: 0
  });
  
  // Update down payment when home price or percentage changes
  useEffect(() => {
    if (downPaymentPercent) {
      const calculatedAmount = homePrice * (downPaymentPercent / 100);
      setDownPayment(calculatedAmount);
    }
  }, [homePrice, downPaymentPercent]);
  
  // Update down payment percent when amount changes
  useEffect(() => {
    if (homePrice > 0) {
      const calculatedPercent = (downPayment / homePrice) * 100;
      setDownPaymentPercent(calculatedPercent);
    }
  }, [downPayment, homePrice]);
  
  // Calculate monthly payment
  const calculateMortgage = () => {
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    // Principal and interest payment
    let monthlyPrincipal = 0;
    if (monthlyRate > 0) {
      monthlyPrincipal = loanAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else {
      monthlyPrincipal = loanAmount / numberOfPayments;
    }
    
    // Monthly property tax
    const monthlyTax = (homePrice * (propertyTax / 100)) / 12;
    
    // Monthly insurance
    const monthlyInsurance = homeInsurance / 12;
    
    // Total monthly payment
    const total = monthlyPrincipal + monthlyTax + monthlyInsurance;
    
    setMonthlyPayment({
      principal: monthlyPrincipal,
      tax: monthlyTax,
      insurance: monthlyInsurance,
      total: total
    });
  };
  
  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, loanTerm, interestRate, propertyTax, homeInsurance]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/[^0-9.]/g, ''));
    setDownPayment(isNaN(value) ? 0 : value);
  };
  
  const handleHomePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/[^0-9.]/g, ''));
    setHomePrice(isNaN(value) ? 0 : value);
  };
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-finance-text">Mortgage Calculator</h3>
        <p className="text-finance-text-light">Calculate your monthly mortgage payments including principal, interest, taxes, and insurance.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="homePrice" className="text-finance-text">Home Price</Label>
              <span className="text-finance-text-light">
                {formatCurrency(homePrice)}
              </span>
            </div>
            <Input
              id="homePrice"
              type="text"
              value={formatCurrency(homePrice)}
              onChange={handleHomePriceChange}
              className="border-finance-muted"
            />
            <Slider
              value={[homePrice]}
              min={50000}
              max={1000000}
              step={5000}
              onValueChange={(value) => setHomePrice(value[0])}
              className="my-2"
            />
            <div className="flex justify-between text-xs text-finance-text-light">
              <span>$50,000</span>
              <span>$1,000,000</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="downPayment" className="text-finance-text">Down Payment</Label>
              <span className="text-finance-text-light">
                {formatCurrency(downPayment)} ({downPaymentPercent.toFixed(1)}%)
              </span>
            </div>
            <Input
              id="downPayment"
              type="text"
              value={formatCurrency(downPayment)}
              onChange={handleDownPaymentChange}
              className="border-finance-muted"
            />
            <Slider
              value={[downPaymentPercent]}
              min={0}
              max={50}
              step={1}
              onValueChange={(value) => setDownPaymentPercent(value[0])}
              className="my-2"
            />
            <div className="flex justify-between text-xs text-finance-text-light">
              <span>0%</span>
              <span>50%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="loanTerm" className="text-finance-text">Loan Term</Label>
              <Select 
                value={loanTerm.toString()} 
                onValueChange={(value) => setLoanTerm(parseInt(value))}
              >
                <SelectTrigger className="border-finance-muted">
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 years</SelectItem>
                  <SelectItem value="15">15 years</SelectItem>
                  <SelectItem value="20">20 years</SelectItem>
                  <SelectItem value="30">30 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="interestRate" className="text-finance-text">Interest Rate (%)</Label>
              <div className="relative">
                <Input
                  id="interestRate"
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                  step="0.125"
                  min="0"
                  max="15"
                  className="pr-8 border-finance-muted"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-finance-text-light">%</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="propertyTax" className="text-finance-text">Property Tax (%)</Label>
              <div className="relative">
                <Input
                  id="propertyTax"
                  type="number"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(parseFloat(e.target.value) || 0)}
                  step="0.01"
                  min="0"
                  max="5"
                  className="pr-8 border-finance-muted"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-finance-text-light">%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="homeInsurance" className="text-finance-text">Annual Insurance</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-finance-text-light">$</span>
                <Input
                  id="homeInsurance"
                  type="number"
                  value={homeInsurance}
                  onChange={(e) => setHomeInsurance(parseFloat(e.target.value) || 0)}
                  className="pl-8 border-finance-muted"
                />
              </div>
            </div>
          </div>
          
          <Button 
            onClick={calculateMortgage}
            className="w-full bg-finance-primary hover:bg-finance-primary/90"
          >
            Calculate
          </Button>
        </div>
        
        <div className="bg-finance-background rounded-lg p-6 flex flex-col">
          <h4 className="text-lg font-medium mb-6 text-finance-text">Monthly Payment</h4>
          
          <div className="text-3xl font-semibold text-finance-primary mb-6">
            {formatCurrency(monthlyPayment.total)}
            <span className="text-sm font-normal text-finance-text-light ml-2">per month</span>
          </div>
          
          <div className="space-y-4 flex-grow">
            <div className="pb-4 border-b border-finance-muted">
              <div className="flex justify-between items-center mb-2">
                <span className="text-finance-text">Principal & Interest</span>
                <span className="font-medium text-finance-text">{formatCurrency(monthlyPayment.principal)}</span>
              </div>
              <div className="w-full bg-finance-muted h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-finance-primary h-full" 
                  style={{ width: `${(monthlyPayment.principal / monthlyPayment.total) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="pb-4 border-b border-finance-muted">
              <div className="flex justify-between items-center mb-2">
                <span className="text-finance-text">Property Tax</span>
                <span className="font-medium text-finance-text">{formatCurrency(monthlyPayment.tax)}</span>
              </div>
              <div className="w-full bg-finance-muted h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-finance-secondary h-full" 
                  style={{ width: `${(monthlyPayment.tax / monthlyPayment.total) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-finance-text">Home Insurance</span>
                <span className="font-medium text-finance-text">{formatCurrency(monthlyPayment.insurance)}</span>
              </div>
              <div className="w-full bg-finance-muted h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-finance-accent h-full" 
                  style={{ width: `${(monthlyPayment.insurance / monthlyPayment.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-lg border border-finance-muted">
            <div className="flex items-start">
              <div className="p-2 bg-finance-primary/10 rounded-full mr-3">
                <ArrowDown className="h-5 w-5 text-finance-primary" />
              </div>
              <div>
                <h5 className="font-medium text-finance-text">Loan Amount</h5>
                <p className="text-xl font-semibold text-finance-text">{formatCurrency(homePrice - downPayment)}</p>
                <p className="text-xs text-finance-text-light mt-1">
                  {loanTerm} year fixed at {interestRate}% APR
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
