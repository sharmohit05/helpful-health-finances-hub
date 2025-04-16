
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from 'lucide-react';

const InterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [time, setTime] = useState(5);
  const [compoundFrequency, setCompoundFrequency] = useState('annually');
  const [result, setResult] = useState({
    futureValue: 0,
    totalInterest: 0,
    effectiveRate: 0
  });
  
  const calculateInterest = () => {
    let n = 1; // times compounded per year
    
    switch (compoundFrequency) {
      case 'annually':
        n = 1;
        break;
      case 'semi-annually':
        n = 2;
        break;
      case 'quarterly':
        n = 4;
        break;
      case 'monthly':
        n = 12;
        break;
      case 'daily':
        n = 365;
        break;
    }
    
    const r = rate / 100; // Convert percentage to decimal
    const nt = n * time;
    
    // Compound interest formula: A = P(1 + r/n)^(nt)
    const futureValue = principal * Math.pow(1 + r / n, nt);
    const totalInterest = futureValue - principal;
    
    // Calculate effective annual rate: (1 + r/n)^n - 1
    const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100;
    
    setResult({
      futureValue,
      totalInterest,
      effectiveRate
    });
  };
  
  useEffect(() => {
    calculateInterest();
  }, [principal, rate, time, compoundFrequency]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-finance-text">Compound Interest Calculator</h3>
        <p className="text-finance-text-light">See how your investments grow over time with compound interest.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="principal" className="text-finance-text">Initial Investment</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-finance-text-light">$</span>
              <Input
                id="principal"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                className="pl-8 border-finance-muted"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rate" className="text-finance-text">Annual Interest Rate (%)</Label>
            <div className="relative">
              <Input
                id="rate"
                type="number"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                className="pr-8 border-finance-muted"
                step="0.1"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-finance-text-light">%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time" className="text-finance-text">Time Period (years)</Label>
            <Input
              id="time"
              type="number"
              value={time}
              onChange={(e) => setTime(parseFloat(e.target.value) || 0)}
              className="border-finance-muted"
              min="1"
              max="50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="compoundFrequency" className="text-finance-text">Compound Frequency</Label>
            <Select 
              value={compoundFrequency} 
              onValueChange={setCompoundFrequency}
            >
              <SelectTrigger className="border-finance-muted">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annually">Annually</SelectItem>
                <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={calculateInterest}
            className="w-full bg-finance-primary hover:bg-finance-primary/90"
          >
            Calculate
          </Button>
        </div>
        
        <div className="space-y-4">
          <Card className="border-finance-secondary/30 bg-gradient-to-br from-finance-background to-finance-secondary/5">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-medium mb-1 text-finance-text">Future Value</h4>
                  <p className="text-sm text-finance-text-light">After {time} years</p>
                </div>
                <div className="bg-finance-secondary/10 p-2 rounded-full">
                  <ArrowUpRight className="h-5 w-5 text-finance-secondary" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-bold text-finance-secondary">
                  {formatCurrency(result.futureValue)}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-medium bg-finance-secondary/10 text-finance-secondary px-2 py-0.5 rounded">
                    +{formatCurrency(result.totalInterest)}
                  </span>
                  <span className="text-xs text-finance-text-light">in interest</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Card>
              <CardContent className="p-4">
                <h5 className="text-sm font-medium text-finance-text-light mb-1">Initial Investment</h5>
                <div className="text-xl font-semibold text-finance-text">{formatCurrency(principal)}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h5 className="text-sm font-medium text-finance-text-light mb-1">Interest Earned</h5>
                <div className="text-xl font-semibold text-finance-primary">{formatCurrency(result.totalInterest)}</div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="p-4">
              <h5 className="text-sm font-medium text-finance-text-light mb-1">Effective Annual Rate</h5>
              <div className="text-xl font-semibold text-finance-text">
                {result.effectiveRate.toFixed(2)}%
              </div>
              <p className="text-xs text-finance-text-light mt-1">
                Based on {compoundFrequency} compounding
              </p>
            </CardContent>
          </Card>
          
          <div className="text-xs text-finance-text-light mt-2 p-2">
            Note: This calculator uses the compound interest formula: A = P(1 + r/n)^(nt) where P is principal, r is rate, n is compound frequency, and t is time.
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestCalculator;
