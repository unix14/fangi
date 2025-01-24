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

  const normalizedValue = Math.min(Math.max(value, 0), 100);
  const rotation = -90 + ((normalizedValue / 100) * 180);

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <svg
        width={size}
        height={size / 1.2}
        viewBox="-100 -100 200 160"
        className="transform"
      >
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF4444" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#4CAF50" />
          </linearGradient>
        </defs>

        {/* Background arc */}
        <path
          d="M -90 0 A 90 90 0 0 1 90 0"
          fill="none"
          stroke="#1E3A8A"
          strokeWidth="25"
          className="opacity-20"
        />

        {/* Colored arc */}
        <path
          d="M -90 0 A 90 90 0 0 1 90 0"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="25"
          className="drop-shadow-lg"
        />

        {/* Labels */}
        <g className="text-[14px] fill-gray-300 font-medium">
          {/* Extreme Fear */}
          <text x="-85" y="30" textAnchor="middle" transform="rotate(-45 -85 30)">
            <tspan x="-85">Extreme</tspan>
            <tspan x="-85" dy="16">Fear</tspan>
          </text>
          
          {/* Fear */}
          <text x="-45" y="20" textAnchor="middle" transform="rotate(-22.5 -45 20)">Fear</text>
          
          {/* Neutral */}
          <text x="0" y="15" textAnchor="middle">Neutral</text>
          
          {/* Greed */}
          <text x="45" y="20" textAnchor="middle" transform="rotate(22.5 45 20)">Greed</text>
          
          {/* Extreme Greed */}
          <text x="85" y="30" textAnchor="middle" transform="rotate(45 85 30)">
            <tspan x="85">Extreme</tspan>
            <tspan x="85" dy="16">Greed</tspan>
          </text>
        </g>

        {/* Tick marks - only on the arc */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const angle = -90 + (tick * 1.8);
          const radian = (angle * Math.PI) / 180;
          const x = 90 * Math.cos(radian);
          const y = 90 * Math.sin(radian);
          
          return (
            <g key={tick}>
              <line
                x1={x * 0.9}
                y1={y * 0.9}
                x2={x}
                y2={y}
                stroke="#94A3B8"
                strokeWidth="2"
                className="opacity-50"
              />
              <text
                x={x * 0.8}
                y={y * 0.8}
                textAnchor="middle"
                fontSize="12"
                fill="#94A3B8"
                className="font-medium opacity-50"
              >
                {tick}
              </text>
            </g>
          );
        })}

        {/* Needle */}
        <g
          className="transition-transform duration-1000 ease-in-out"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "center",
          }}
        >
          <line
            x1="0"
            y1="5"
            x2="0"
            y2="-65"
            stroke="#FFFFFF"
            strokeWidth="4"
            className="drop-shadow"
          />
          <circle
            cx="0"
            cy="0"
            r="8"
            fill="#FFFFFF"
            className="drop-shadow"
          />
        </g>
      </svg>
      
      {/* Value display */}
      <div className="mt-4 text-6xl font-bold text-black dark:text-white">
        {normalizedValue}
      </div>
    </div>
  );
};