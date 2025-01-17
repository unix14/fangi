import { useState, useEffect } from 'react';
import { Info, ArrowRight } from 'lucide-react';
import { FearGreedGauge } from '@/components/FearGreedGauge';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

const Index = () => {
  const [fearGreedValue, setFearGreedValue] = useState(38);
  const [historicalData, setHistoricalData] = useState({
    previousClose: 'Fear',
    oneWeekAgo: 'Fear',
    oneMonthAgo: 'Neutral',
    oneYearAgo: 'Greed'
  });

  // Simulated data fetch - replace with actual API call
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        const randomValue = Math.floor(Math.random() * (100 - 30 + 1)) + 30;
        setFearGreedValue(randomValue);
      } catch (error) {
        console.error('Error fetching fear and greed data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-financial-navy to-gray-900 text-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="text-white hover:text-financial-gold"
            onClick={() => window.open('https://www.cnn.com/markets/fear-and-greed', '_blank')}
          >
            Read more <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:text-financial-gold">
                <Info className="h-5 w-5" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-gray-800 text-white border-gray-700">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Fear & Greed Index</h4>
                <p className="text-sm">
                  The Fear & Greed Index is a tool for evaluating market sentiment,
                  combining 7 different market indicators to measure investor emotions.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        
        <h1 className="text-sm font-light text-center text-white/80 absolute left-1/2 -translate-x-1/2">
          Fear & Greed Index
        </h1>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <FearGreedGauge value={fearGreedValue} className="mb-8" />
          
          {/* Historical Data */}
          <div className="space-y-2 text-gray-300 mb-8">
            <div className="flex justify-between">
              <span>Previous close</span>
              <span className="font-medium">{historicalData.previousClose}</span>
            </div>
            <div className="flex justify-between">
              <span>1 week ago</span>
              <span className="font-medium">{historicalData.oneWeekAgo}</span>
            </div>
            <div className="flex justify-between">
              <span>1 month ago</span>
              <span className="font-medium">{historicalData.oneMonthAgo}</span>
            </div>
            <div className="flex justify-between">
              <span>1 year ago</span>
              <span className="font-medium">{historicalData.oneYearAgo}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-bold text-white mb-2">What is Fear & Greed Index?</h2>
              <p>
                The Fear & Greed Index is a pivotal tool for evaluating stock market dynamics
                and pricing equity. It's predicated on the notion that excessive fear depresses
                stock prices, while heightened greed has the opposite effect.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-2">How is Fear & Greed Calculated?</h2>
              <p>
                The Fear & Greed Index combines 7 stock indicators, equal-weighted,
                for scores 0 (fear) to 100 (greed).
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-400">
        <a
          href="https://github.com/unix14"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-financial-gold transition-colors"
        >
          Eyal Yaakobi
        </a>
      </footer>
    </div>
  );
};

export default Index;