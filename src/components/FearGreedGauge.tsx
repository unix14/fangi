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
  
  // Calculate rotation based on value (180 degree arc)
  const rotation = -90 + ((normalizedValue / 100) * 180);

  // Get sentiment text based on value
  const getSentimentText = (value: number) => {
    if (value <= 25) return 'EXTREME\nFEAR';
    if (value <= 45) return 'FEAR';
    if (value <= 55) return 'NEUTRAL';
    if (value <= 75) return 'GREED';
    return 'EXTREME\nGREED';
  };

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <svg
        width={size}
        height={size / 1.5}
        viewBox="-100 -80 200 160"
        className="transform"
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f3f3f3" />
            <stop offset="100%" stopColor="#f3f3f3" />
          </linearGradient>
        </defs>

        {/* Main background arc */}
        <path
          d="M -90 0 A 90 90 0 0 1 90 0"
          fill="none"
          stroke="#f3f3f3"
          strokeWidth="30"
          className="opacity-50"
        />

        {/* Tick marks and labels */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const angle = -90 + (tick * 1.8);
          const radian = (angle * Math.PI) / 180;
          const x = 75 * Math.cos(radian);
          const y = 75 * Math.sin(radian);
          const textX = 95 * Math.cos(radian);
          const textY = 95 * Math.sin(radian);
          
          return (
            <g key={tick}>
              <line
                x1={x * 0.95}
                y1={y * 0.95}
                x2={x}
                y2={y}
                stroke="#666"
                strokeWidth="2"
              />
              <text
                x={textX}
                y={textY}
                textAnchor="middle"
                fontSize="10"
                fill="#666"
                transform={`rotate(${angle + 90} ${textX} ${textY})`}
              >
                {tick}
              </text>
            </g>
          );
        })}

        {/* Sentiment labels */}
        {[
          { text: "EXTREME\nFEAR", angle: -90, offset: -40 },
          { text: "FEAR", angle: -45, offset: -25 },
          { text: "NEUTRAL", angle: 0, offset: -20 },
          { text: "GREED", angle: 45, offset: -25 },
          { text: "EXTREME\nGREED", angle: 90, offset: -40 }
        ].map((label) => {
          const radian = (label.angle * Math.PI) / 180;
          const x = (90 + label.offset) * Math.cos(radian);
          const y = (90 + label.offset) * Math.sin(radian);
          
          return (
            <text
              key={label.text}
              x={x}
              y={y}
              textAnchor="middle"
              fontSize="12"
              fill="#666"
              className="font-semibold"
            >
              {label.text.split('\n').map((line, i) => (
                <tspan key={i} x={x} dy={i ? "1.2em" : "0"}>
                  {line}
                </tspan>
              ))}
            </text>
          );
        })}

        {/* Needle */}
        <g
          className="transition-transform duration-1000"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "center",
          }}
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-75"
            stroke="#000"
            strokeWidth="2"
          />
          <circle
            cx="0"
            cy="0"
            r="5"
            fill="#000"
          />
        </g>

        {/* Center value */}
        <text
          x="0"
          y="40"
          textAnchor="middle"
          className="text-4xl font-bold"
          fill="#000"
        >
          {normalizedValue}
        </text>
      </svg>
    </div>
  );
};