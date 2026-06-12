/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0C0C0C",
        darkCard: "#161616",
        purpleAccent: "#7C3AED",
        successGreen: "#10B981",
        errorRed: "#EF4444",
        textLight: "#D7E2EA",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
