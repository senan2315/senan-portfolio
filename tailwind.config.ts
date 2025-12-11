import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0f172a",
          muted: "#111827",
          card: "#111827",
          border: "#1f2937"
        }
      },
      boxShadow: {
        glow: "0 10px 50px rgba(15, 23, 42, 0.4)"
      }
    }
  },
  plugins: []
};

export default config;


