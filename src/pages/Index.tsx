import { useState, useEffect } from 'react';
import { FearGreedGauge } from '@/components/FearGreedGauge';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [fearGreedValue, setFearGreedValue] = useState(50);

  // Simulate value changes for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setFearGreedValue(Math.random() * 100);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-financial-navy to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Fear & Greed Index
        </h1>
        
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-8 rounded-xl">
          <div className="flex flex-col items-center justify-center">
            <FearGreedGauge value={fearGreedValue} className="mb-8" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-financial-gold">Market Indicators</h3>
                <p className="text-gray-300">Market Momentum: Strong</p>
                <p className="text-gray-300">Market Volatility: Low</p>
                <p className="text-gray-300">Stock Price Strength: High</p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-financial-gold">Market Summary</h3>
                <p className="text-gray-300">
                  Current market sentiment indicates balanced conditions with a slight tendency towards optimism.
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="mt-8 text-center text-sm text-gray-400">
          Data updates every 5 seconds (demo mode)
        </div>
      </div>
    </div>
  );
};

export default Index;