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
  
  // Calculate rotation based on value (adjusted for proper orientation)
  const rotation = (normalizedValue / 100) * 180;
  
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
        height={size / 1.6}
        viewBox="0 0 300 200"
        className="transform rotate-0"
      >
        {/* Background arc */}
        <path
          d="M 50 150 A 100 100 0 0 1 250 150"
          fill="none"
          stroke="#374151"
          strokeWidth="30"
          strokeLinecap="round"
          className="transition-all duration-300"
        />
        
        {/* Value arc */}
        <path
          d="M 50 150 A 100 100 0 0 1 250 150"
          fill="none"
          stroke="currentColor"
          strokeWidth="30"
          strokeLinecap="round"
          strokeDasharray={`${normalizedValue}, 100`}
          className={cn(
            "transition-all duration-1000",
            getSentimentColor(normalizedValue),
            mounted && "animate-gauge-progress"
          )}
          style={{ "--gauge-value": normalizedValue } as React.CSSProperties}
        />
        
        {/* Needle */}
        <g
          className="transition-all duration-1000 origin-center"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: '150px 150px',
          }}
        >
          <line
            x1="150"
            y1="150"
            x2="150"
            y2="60"
            stroke="#ffffff"
            strokeWidth="4"
          />
          <circle
            cx="150"
            cy="150"
            r="15"
            fill="#ffffff"
          />
        </g>
      </svg>
      
      {/* Value display */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
        <span className={cn("text-6xl font-bold", getSentimentColor(normalizedValue))}>
          {normalizedValue}
        </span>
        <span className="text-2xl font-semibold text-white mt-2">
          {getSentimentText(normalizedValue)}
        </span>
      </div>
    </div>
  );
};