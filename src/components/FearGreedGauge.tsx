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
        height={size / 1.5}
        viewBox="-100 -80 200 160"
        className="transform"
      >
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FCD34D" />
            <stop offset="75%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Background arc */}
        <path
          d="M -90 0 A 90 90 0 0 1 90 0"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="24"
          className="opacity-30"
        />

        {/* Colored arc */}
        <path
          d="M -90 0 A 90 90 0 0 1 90 0"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="24"
          className="drop-shadow-lg"
        />

        {/* Tick marks */}
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
                stroke="#4B5563"
                strokeWidth="2"
                className="drop-shadow-sm"
              />
              <text
                x={textX}
                y={textY}
                textAnchor="middle"
                fontSize="12"
                fill="#4B5563"
                fontWeight="600"
                transform={`rotate(${angle + 90} ${textX} ${textY})`}
                className="drop-shadow-sm"
              >
                {tick}
              </text>
            </g>
          );
        })}

        {/* Labels */}
        {[
          { text: "Extreme\nFear", angle: -90, offset: -40 },
          { text: "Fear", angle: -45, offset: -25 },
          { text: "Neutral", angle: 0, offset: -20 },
          { text: "Greed", angle: 45, offset: -25 },
          { text: "Extreme\nGreed", angle: 90, offset: -40 }
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
              fontSize="11"
              fill="#374151"
              fontWeight="600"
              className="font-sans drop-shadow-sm"
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
            y2="-70"
            stroke="#1F2937"
            strokeWidth="4"
            className="drop-shadow-md"
          />
          <circle
            cx="0"
            cy="0"
            r="8"
            fill="#1F2937"
            className="drop-shadow-md"
          />
        </g>

        {/* Value display */}
        <text
          x="0"
          y="40"
          textAnchor="middle"
          className="text-4xl font-bold font-sans drop-shadow-sm"
          fill="#1F2937"
        >
          {normalizedValue}
        </text>
      </svg>
    </div>
  );
};