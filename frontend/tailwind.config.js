/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 40px -20px rgba(14, 70, 128, 0.45)",
      },
      colors: {
        brand: {
          50: "#f2f8ff",
          100: "#d9ebff",
          500: "#1177cc",
          700: "#0f5fa3",
        },
        alert: {
          500: "#d14343",
        },
      },
    },
  },
  plugins: [],
};
