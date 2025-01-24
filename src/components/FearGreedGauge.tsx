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
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>

        {/* Background arc */}
        <path
          d="M -90 0 A 90 90 0 0 1 90 0"
          fill="none"
          stroke="#1E3A8A"
          strokeWidth="20"
          className="opacity-30"
        />

        {/* Colored arc */}
        <path
          d="M -90 0 A 90 90 0 0 1 90 0"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="20"
          className="drop-shadow-lg"
        />

        {/* Labels */}
        {[
          { text: "Extreme\nFear", x: -85, y: -20 },
          { text: "Fear", x: -45, y: -35 },
          { text: "Neutral", x: 0, y: -45 },
          { text: "Greed", x: 45, y: -35 },
          { text: "Extreme\nGreed", x: 85, y: -20 }
        ].map((label) => (
          <text
            key={label.text}
            x={label.x}
            y={label.y}
            textAnchor="middle"
            fontSize="11"
            fill="#94A3B8"
            className="font-medium"
          >
            {label.text.split('\n').map((line, i) => (
              <tspan key={i} x={label.x} dy={i ? "1.2em" : "0"}>
                {line}
              </tspan>
            ))}
          </text>
        ))}

        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const angle = -90 + (tick * 1.8);
          const radian = (angle * Math.PI) / 180;
          const x = 75 * Math.cos(radian);
          const y = 75 * Math.sin(radian);
          
          return (
            <g key={tick}>
              <line
                x1={x * 0.95}
                y1={y * 0.95}
                x2={x}
                y2={y}
                stroke="#94A3B8"
                strokeWidth="2"
                className="opacity-50"
              />
              <text
                x={x * 1.2}
                y={y * 1.2}
                textAnchor="middle"
                fontSize="10"
                fill="#94A3B8"
                className="font-medium"
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
            stroke="#E2E8F0"
            strokeWidth="3"
            className="drop-shadow"
          />
          <circle
            cx="0"
            cy="0"
            r="6"
            fill="#E2E8F0"
            className="drop-shadow"
          />
        </g>

        {/* Value display */}
        <text
          x="0"
          y="40"
          textAnchor="middle"
          className="text-4xl font-bold text-slate-200"
        >
          {normalizedValue}
        </text>
      </svg>
    </div>
  );
};