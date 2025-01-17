import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface GaugeProps {
  value: number;
  size?: number;
  className?: string;
}

export const FearGreedGauge = ({ value, size = 300, className }: GaugeProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Normalize value between 0 and 100
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  
  // Calculate rotation based on value
  const rotation = (normalizedValue / 100) * 180 - 90;
  
  // Determine sentiment color
  const getSentimentColor = (value: number) => {
    if (value <= 25) return 'text-financial-red';
    if (value <= 45) return 'text-orange-500';
    if (value <= 55) return 'text-financial-gold';
    if (value <= 75) return 'text-lime-500';
    return 'text-financial-green';
  };

  // Get sentiment text
  const getSentimentText = (value: number) => {
    if (value <= 25) return 'Extreme Fear';
    if (value <= 45) return 'Fear';
    if (value <= 55) return 'Neutral';
    if (value <= 75) return 'Greed';
    return 'Extreme Greed';
  };

  return (
    <div className={cn("relative", className)}>
      <svg
        width={size}
        height={size / 2}
        viewBox={`0 0 ${size} ${size / 2}`}
        className="transform -rotate-90"
      >
        {/* Background arc */}
        <path
          d="M 25 150 A 125 125 0 0 1 275 150"
          fill="none"
          stroke="#374151"
          strokeWidth="40"
          className="transition-all duration-300"
        />
        
        {/* Value arc */}
        <path
          d="M 25 150 A 125 125 0 0 1 275 150"
          fill="none"
          stroke="currentColor"
          strokeWidth="40"
          strokeDasharray={`${normalizedValue}, 100`}
          className={cn(
            "transition-all duration-1000",
            getSentimentColor(normalizedValue),
            mounted && "animate-gauge-progress"
          )}
          style={{ "--gauge-value": normalizedValue } as React.CSSProperties}
        />
        
        {/* Needle */}
        <line
          x1="150"
          y1="150"
          x2="150"
          y2="40"
          stroke="#ffffff"
          strokeWidth="4"
          className="transition-all duration-1000 origin-bottom"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: '150px 150px',
          }}
        />
        
        {/* Center circle */}
        <circle
          cx="150"
          cy="150"
          r="15"
          fill="#ffffff"
          className="transition-all duration-300"
        />
      </svg>
      
      {/* Value display */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
        <span className={cn("text-5xl font-bold", getSentimentColor(normalizedValue))}>
          {normalizedValue}
        </span>
        <span className="text-2xl font-semibold text-white mt-2">
          {getSentimentText(normalizedValue)}
        </span>
      </div>
    </div>
  );
};