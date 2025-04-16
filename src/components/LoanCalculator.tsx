
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { ArrowRight } from 'lucide-react';

const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(15);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  
  const calculateLoan = () => {
    // Convert annual rate to monthly rate and term years to months
    const monthlyRate = interestRate / 100 / 12;
    const termMonths = loanTerm * 12;
    
    if (monthlyRate === 0) {
      const payment = loanAmount / termMonths;
      setMonthlyPayment(payment);
      setTotalPayment(loanAmount);
      setTotalInterest(0);
      return;
    }
    
    // Calculate monthly payment
    const x = Math.pow(1 + monthlyRate, termMonths);
    const monthly = (loanAmount * x * monthlyRate) / (x - 1);
    
    if (isFinite(monthly)) {
      setMonthlyPayment(monthly);
      setTotalPayment(monthly * termMonths);
      setTotalInterest((monthly * termMonths) - loanAmount);
    } else {
      toast.error("Please check your inputs");
      setMonthlyPayment(0);
      setTotalPayment(0);
      setTotalInterest(0);
    }
  };
  
  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };
  
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/[^0-9.]/g, ''));
    setLoanAmount(isNaN(value) ? 0 : value);
  };
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-finance-text">Loan Calculator</h3>
        <p className="text-finance-text-light">Calculate your monthly payments based on loan amount, interest rate, and term.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="loanAmount" className="text-finance-text">Loan Amount</Label>
              <span className="text-finance-text-light">
                {formatCurrency(loanAmount)}
              </span>
            </div>
            <Input
              id="loanAmount"
              type="text"
              value={formatCurrency(loanAmount)}
              onChange={handleLoanAmountChange}
              className="border-finance-muted"
            />
            <Slider
              value={[loanAmount]}
              min={1000}
              max={1000000}
              step={1000}
              onValueChange={(value) => setLoanAmount(value[0])}
              className="my-2"
            />
            <div className="flex justify-between text-xs text-finance-text-light">
              <span>$1,000</span>
              <span>$1,000,000</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="interestRate" className="text-finance-text">Interest Rate (%)</Label>
              <span className="text-finance-text-light">{interestRate}%</span>
            </div>
            <Input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
              className="border-finance-muted"
              step="0.1"
            />
            <Slider
              value={[interestRate]}
              min={0.1}
              max={20}
              step={0.1}
              onValueChange={(value) => setInterestRate(value[0])}
              className="my-2"
            />
            <div className="flex justify-between text-xs text-finance-text-light">
              <span>0.1%</span>
              <span>20%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="loanTerm" className="text-finance-text">Loan Term (years)</Label>
              <span className="text-finance-text-light">{loanTerm} years</span>
            </div>
            <Input
              id="loanTerm"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(parseInt(e.target.value) || 0)}
              className="border-finance-muted"
              min="1"
              max="40"
            />
            <Slider
              value={[loanTerm]}
              min={1}
              max={40}
              step={1}
              onValueChange={(value) => setLoanTerm(value[0])}
              className="my-2"
            />
            <div className="flex justify-between text-xs text-finance-text-light">
              <span>1 year</span>
              <span>40 years</span>
            </div>
          </div>
          
          <Button 
            onClick={calculateLoan}
            className="w-full bg-finance-primary hover:bg-finance-primary/90"
          >
            Calculate
          </Button>
        </div>
        
        <div className="bg-finance-background rounded-lg p-6 flex flex-col">
          <h4 className="text-lg font-medium mb-6 text-finance-text">Estimated Payments</h4>
          
          <div className="space-y-6 flex-grow">
            <div className="flex flex-col">
              <span className="text-finance-text-light text-sm">Monthly Payment</span>
              <span className="text-3xl font-semibold text-finance-primary">
                {formatCurrency(monthlyPayment)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-finance-text-light text-sm">Total Principal</span>
                <span className="text-xl font-medium text-finance-text">
                  {formatCurrency(loanAmount)}
                </span>
              </div>
              
              <div className="flex items-center justify-center">
                <ArrowRight className="text-finance-text-light" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-finance-text-light text-sm">Total Interest</span>
                <span className="text-xl font-medium text-finance-text">
                  {formatCurrency(totalInterest)}
                </span>
              </div>
              
              <div className="flex items-center justify-center">
                <ArrowRight className="text-finance-text-light" />
              </div>
            </div>
            
            <div className="border-t border-finance-muted pt-4 mt-auto">
              <div className="flex flex-col">
                <span className="text-finance-text-light text-sm">Total Payment</span>
                <span className="text-2xl font-semibold text-finance-text">
                  {formatCurrency(totalPayment)}
                </span>
              </div>
              <div className="text-xs text-finance-text-light mt-1">
                Over {loanTerm} years ({loanTerm * 12} payments)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
