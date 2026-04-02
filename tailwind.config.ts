import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f6f1e8",
        ink: "#182121",
        accent: "#1b7a5d",
        accentSoft: "#d5ebdf",
        panel: "#fffcf6",
      },
      boxShadow: {
        game: "0 12px 30px rgba(24, 33, 33, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
