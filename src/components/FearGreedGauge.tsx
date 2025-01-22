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
        {/* Background gradient */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#eab308" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Background arc */}
        <path
          d="M -90 0 A 90 90 0 0 1 90 0"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="30"
          strokeLinecap="round"
          className="transition-all duration-300"
        />

        {/* Value arc */}
        <path
          d="M -90 0 A 90 90 0 0 1 90 0"
          fill="none"
          stroke={getSentimentColor(normalizedValue)}
          strokeWidth="30"
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
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-80"
            stroke="#ffffff"
            strokeWidth="4"
            className="drop-shadow-md"
          />
          <circle
            cx="0"
            cy="0"
            r="15"
            fill="#ffffff"
            className="drop-shadow-lg"
          />
        </g>

        {/* Center text */}
        <text
          x="0"
          y="50"
          textAnchor="middle"
          className="text-4xl font-bold fill-white drop-shadow-lg"
          style={{ fontSize: '2.5rem' }}
        >
          {normalizedValue}
        </text>
        
        <text
          x="0"
          y="80"
          textAnchor="middle"
          className="text-xl font-semibold fill-white drop-shadow-md"
          style={{ fontSize: '1.25rem' }}
        >
          {getSentimentText(normalizedValue)}
        </text>
      </svg>
    </div>
  );
};