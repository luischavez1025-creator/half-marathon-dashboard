import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        appleBlue: "#0071E3",
        appleGray: "#F5F5F7",
        appleTextSecondary: "#6E6E73",
      },
      borderRadius: {
        apple: "20px",
      },
      boxShadow: {
        apple: "0 4px 20px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;