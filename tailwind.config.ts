import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        financial: {
          navy: "#1E3A8A",
          gold: "#FCD34D",
          red: "#EF4444",
          green: "#10B981"
        }
      },
      animation: {
        "gauge-progress": "gauge 1.5s ease-in-out forwards",
      },
      keyframes: {
        gauge: {
          "0%": { strokeDasharray: "0, 100" },
          "100%": { strokeDasharray: "var(--gauge-value), 100" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
