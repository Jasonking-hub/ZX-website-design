import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#071A2F",
        industrial: "#086ACB",
        electric: "#24A8F4",
        blueprint: "#EDF3F7",
        ink: "#263341",
      },
      boxShadow: {
        blueprint: "0 24px 80px rgba(7, 26, 47, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
