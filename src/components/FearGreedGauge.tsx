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
  const rotation = -90 + ((normalizedValue / 100) * 180);
  
  // Determine sentiment color
  const getSentimentColor = (value: number) => {
    if (value <= 25) return '#ef4444';
    if (value <= 45) return '#f97316';
    if (value <= 55) return '#eab308';
    if (value <= 75) return '#22c55e';
    return '#16a34a';
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
    <div className={cn("relative flex flex-col items-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox="-120 -120 240 240"
        className="transform"
      >
        {/* Metallic ring gradient */}
        <defs>
          <linearGradient id="metalRing" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8E9196" />
            <stop offset="50%" stopColor="#8A898C" />
            <stop offset="100%" stopColor="#555555" />
          </linearGradient>
          
          {/* Background gradient */}
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>

          {/* Metallic effect for needle */}
          <linearGradient id="needleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D1D1D1" />
            <stop offset="50%" stopColor="#F5F5F5" />
            <stop offset="100%" stopColor="#D1D1D1" />
          </linearGradient>
        </defs>

        {/* Outer metallic ring */}
        <circle
          cx="0"
          cy="0"
          r="110"
          fill="none"
          stroke="url(#metalRing)"
          strokeWidth="8"
          className="drop-shadow-lg"
        />

        {/* Dark background */}
        <circle
          cx="0"
          cy="0"
          r="100"
          fill="#1A1F2C"
          className="drop-shadow-inner"
        />

        {/* Tick marks */}
        {Array.from({ length: 11 }).map((_, i) => {
          const angle = -90 + (i * 18);
          const isMainTick = i % 2 === 0;
          return (
            <line
              key={i}
              x1={isMainTick ? 75 : 85}
              y1="0"
              x2="95"
              y2="0"
              stroke="#FFFFFF"
              strokeWidth={isMainTick ? 3 : 2}
              transform={`rotate(${angle})`}
              opacity={isMainTick ? 1 : 0.7}
            />
          );
        })}

        {/* Value arc */}
        <path
          d="M -90 0 A 90 90 0 0 1 90 0"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          opacity="0.6"
          className="drop-shadow-md"
        />

        {/* Active value arc */}
        <path
          d="M -90 0 A 90 90 0 0 1 90 0"
          fill="none"
          stroke={getSentimentColor(normalizedValue)}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${normalizedValue * 2.82}, 282`}
          className="transition-all duration-1000 drop-shadow-lg"
          transform="rotate(-90)"
        />

        {/* Needle */}
        <g
          className="transition-all duration-1000"
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <path
            d="M -2 0 L 0 -75 L 2 0 Z"
            fill="url(#needleGradient)"
            className="drop-shadow-lg"
          />
          <circle
            cx="0"
            cy="0"
            r="12"
            fill="url(#metalRing)"
            className="drop-shadow-xl"
          />
        </g>

        {/* Value text */}
        <text
          x="0"
          y="40"
          textAnchor="middle"
          className="text-4xl font-bold fill-white drop-shadow-lg"
          style={{ fontSize: '2rem' }}
        >
          {normalizedValue}
        </text>
        
        {/* Sentiment text */}
        <text
          x="0"
          y="70"
          textAnchor="middle"
          className="text-xl font-semibold fill-white drop-shadow-md"
          style={{ fontSize: '1rem' }}
        >
          {getSentimentText(normalizedValue)}
        </text>
      </svg>
    </div>
  );
};