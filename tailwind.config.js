/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-light": "#f0f4f8",
        "bg-dark": "#0a0f18",

        "surface-light": "#ffffff",
        "surface-dark": "#111827",

        "text-light": "#1f2937",
        "text-dark": "#f3f4f6",

        "text-secondary-light": "#4b5563",
        "text-secondary-dark": "#9ca3af",

        "border-light": "#e5e7eb",
        "border-dark": "#374151",

        accent1: "#3b82f6",
        accent2: "#8b5cf6",
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
};
