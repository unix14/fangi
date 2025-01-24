import { useState, useEffect } from 'react';
import { FearGreedIndicator } from '@/components/FearGreedIndicator';
import { fetchFearGreedIndex } from '@/services/fearGreedApi';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [fearGreedValue, setFearGreedValue] = useState(50);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFearGreedIndex();
      if (data) {
        setFearGreedValue(data.value);
      } else {
        toast({
          title: "Error fetching data",
          description: "Could not fetch Fear & Greed Index. Using demo data instead.",
          variant: "destructive",
        });
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-financial-navy to-gray-900 text-white">
      <header className="p-4 flex justify-center items-center">
        <h1 className="text-sm font-light text-center text-white/80">
          Fear & Greed Index
        </h1>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <FearGreedIndicator value={fearGreedValue} className="mb-8" />
          
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