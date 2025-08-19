import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#F5F5F5',
        'text': '#333333',
        'accent': '#4A90E2',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(to right, #4A90E2, #0062D1)',
        'gradient-accent-light': 'linear-gradient(to right, rgba(74, 144, 226, 0.99), rgba(0, 98, 209, 0.99))',
      }
    },
  },
  plugins: [],
};
export default config;
