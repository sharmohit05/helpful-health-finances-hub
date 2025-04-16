
import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RotateCcw } from 'lucide-react';

interface CalculatorHistoryProps {
  history: string[];
  onClear: () => void;
}

const CalculatorHistory: React.FC<CalculatorHistoryProps> = ({ history, onClear }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-finance-muted">
        <h3 className="text-sm font-medium text-finance-text">History</h3>
        {history.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClear}
            className="h-8 px-2 text-finance-text-light hover:text-finance-text"
          >
            <RotateCcw size={14} className="mr-1" />
            Clear
          </Button>
        )}
      </div>
      
      <ScrollArea className="flex-1">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <p className="text-finance-text-light text-sm">No calculations yet</p>
            <p className="text-xs text-finance-text-light mt-1">Your calculation history will appear here</p>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {history.map((item, index) => (
              <div 
                key={index} 
                className="text-sm p-2 hover:bg-finance-background rounded transition-colors text-finance-text"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default CalculatorHistory;
