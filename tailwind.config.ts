// tailwind.config.ts
import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx}",
    // Or just "./src/**/*.{js,ts,jsx,tsx}" if you like
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["aqua", "dark"],
  },
};

export default config;
