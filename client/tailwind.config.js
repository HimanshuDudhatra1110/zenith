/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure Tailwind scans your JSX files
  theme: {
    extend: {
      colors: {
        zenCyan: {
          DEFAULT: "#00ADB5",
          50: "#E0F9FA",
          100: "#C1F3F5",
          200: "#83E6EA",
          300: "#45D8DF",
          400: "#1ECAD4",
          500: "#00ADB5",
          600: "#008A91",
          700: "#00666D",
          800: "#004349",
          900: "#002024",
        },
      },
    },
  },
  plugins: [],
};
