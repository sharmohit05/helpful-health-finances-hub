
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import CalculatorHistory from './CalculatorHistory';
import { 
  Divide, 
  X, 
  Minus, 
  Plus, 
  Equal, 
  Percent, 
  RotateCcw, 
  Delete 
} from 'lucide-react';

const BasicCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const clearDisplay = () => {
    setDisplay('0');
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay((value * -1).toString());
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay((value / 100).toString());
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (currentValue === null) {
      setCurrentValue(inputValue);
    } else if (operator) {
      const result = calculate(currentValue, inputValue, operator);
      setDisplay(String(result));
      setCurrentValue(result);

      // Add to history
      setHistory(prev => [...prev, `${currentValue} ${operator} ${inputValue} = ${result}`]);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (a: number, b: number, operation: string) => {
    switch (operation) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return a / b;
      default:
        return b;
    }
  };

  const handleEquals = () => {
    if (currentValue !== null && operator) {
      const inputValue = parseFloat(display);
      const result = calculate(currentValue, inputValue, operator);
      setDisplay(String(result));
      
      // Add to history
      setHistory(prev => [...prev, `${currentValue} ${operator} ${inputValue} = ${result}`]);
      
      setCurrentValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          <div className="bg-finance-background p-4 rounded-md text-right text-3xl font-semibold h-20 flex items-center justify-end">
            {display}
          </div>
          <div className="grid grid-cols-4 gap-2">
            <Button 
              variant="outline" 
              className="text-finance-text-light hover:bg-finance-muted aspect-square h-14 text-lg"
              onClick={clearDisplay}
            >
              AC
            </Button>
            <Button 
              variant="outline" 
              className="text-finance-text-light hover:bg-finance-muted aspect-square h-14 text-lg"
              onClick={clearEntry}
            >
              CE
            </Button>
            <Button 
              variant="outline" 
              className="text-finance-text-light hover:bg-finance-muted aspect-square h-14"
              onClick={inputPercent}
            >
              <Percent size={20} />
            </Button>
            <Button 
              variant="outline" 
              className="text-finance-primary font-bold hover:bg-finance-primary/10 aspect-square h-14"
              onClick={() => performOperation('÷')}
            >
              <Divide size={20} />
            </Button>
            
            <Button 
              variant="outline" 
              className="hover:bg-finance-muted aspect-square h-14 text-lg"
              onClick={() => inputDigit('7')}
            >
              7
            </Button>
            <Button 
              variant="outline" 
              className="hover:bg-finance-muted aspect-square h-14 text-lg"
              onClick={() => inputDigit('8')}
            >
              8
            </Button>
            <Button 
              variant="outline" 
              className="hover:bg-finance-muted aspect-square h-14 text-lg"
              onClick={() => inputDigit('9')}
            >
              9
            </Button>
            <Button 
              variant="outline" 
              className="text-finance-primary font-bold hover:bg-finance-primary/10 aspect-square h-14"
              onClick={() => performOperation('×')}
            >
              <X size={20} />
            </Button>
            
            <Button 
              variant="outline" 
              className="hover:bg-finance-muted aspect-square h-14 text-lg"
              onClick={() => inputDigit('4')}
            >
              4
            </Button>
            <Button 
              variant="outline" 
              className="hover:bg-finance-muted aspect-square h-14 text-lg"
              onClick={() => inputDigit('5')}
            >
              5
            </Button>
            <Button 
              variant="outline" 
              className="hover:bg-finance-muted aspect-square h-14 text-lg"
              onClick={() => inputDigit('6')}
            >
              6
            </Button>
            <Button 
              variant="outline" 
              className="text-finance-primary font-bold hover:bg-finance-primary/10 aspect-square h-14"
              onClick={() => performOperation('-')}
            >
              <Minus size={20} />
            </Button>
            
            <Button 
              variant="outline" 
              className="hover:bg-finance-muted aspect-square h-14 text-lg"
              onClick={() => inputDigit('1')}
            >
              1
            </Button>
            <Button 
              variant="outline" 
              className="hover:bg-finance-muted aspect-square h-14 text-lg"
              onClick={() => inputDigit('2')}
            >
              2
            </Button>
            <Button 
              variant="outline" 
              className="hover:bg-finance-muted aspect-square h-14 text-lg"
              onClick={() => inputDigit('3')}
            >
              3
            </Button>
            <Button 
              variant="outline" 
              className="text-finance-primary font-bold hover:bg-finance-primary/10 aspect-square h-14"
              onClick={() => performOperation('+')}
            >
              <Plus size={20} />
            </Button>
            
            <Button 
              variant="outline" 
              className="hover:bg-finance-muted aspect-square h-14"
              onClick={toggleSign}
            >
              +/-
            </Button>
            <Button 
              variant="outline" 
              className="hover:bg-finance-muted aspect-square h-14 text-lg"
              onClick={() => inputDigit('0')}
            >
              0
            </Button>
            <Button 
              variant="outline" 
              className="hover:bg-finance-muted aspect-square h-14 text-xl"
              onClick={inputDecimal}
            >
              .
            </Button>
            <Button 
              className="bg-finance-primary hover:bg-finance-primary/90 text-white aspect-square h-14"
              onClick={handleEquals}
            >
              <Equal size={20} />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-finance-muted">
        <CalculatorHistory history={history} onClear={() => setHistory([])} />
      </div>
    </div>
  );
};

export default BasicCalculator;
