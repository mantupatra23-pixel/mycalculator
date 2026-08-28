import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fde5d6",
        navy: "#152935",
        steel: "#698ea2",
        sand: "#e4a576",
        sage: "#ccd5d2",
      },
    },
  },
  plugins: [],
};
export default config;
