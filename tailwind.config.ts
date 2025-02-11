// tailwind.config.ts
import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    // Or just "./src/**/*.{js,ts,jsx,tsx}" if you like
  ],
  theme: {
    extend: {
      //  Keyframes for fade-in-up animation
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: 0,
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
      // Animation shortcuts
      animation: {
        fadeInUp: "fadeInUp 0.6s ease-out forwards",
      },
      //  Custom colors
      colors: {
        brandBlue: "#1d4ed8",
        brandGray: "#f3f4f6",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["aqua", "dark"],
  },
};

export default config;
