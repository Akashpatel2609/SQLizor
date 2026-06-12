/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgMain: "var(--bg-color)",
        cardMain: "var(--card-bg)",
        cardSubtle30: "var(--card-bg-subtle-30)",
        cardSubtle60: "var(--card-bg-subtle-60)",
        cardSubtle75: "var(--card-bg-subtle-75)",
        cardSubtle10: "var(--card-bg-subtle-10)",
        cardSubtle50: "var(--card-bg-subtle-50)",
        cardSubtle20: "var(--card-bg-subtle-20)",
        cardSubtle40: "var(--card-bg-subtle-40)",
        sidebarMain: "var(--sidebar-bg)",
        sidebarSubtle40: "var(--sidebar-bg-subtle-40)",
        editorSubtle50: "var(--editor-bg-subtle-50)",
        headerSubtle70: "var(--header-bg-subtle-70)",
        headerSubtle90: "var(--header-bg-subtle-90)",
        headerSubtle85: "var(--header-bg-subtle-85)",
        
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        textSubtle: "var(--text-subtle)",
        borderMain: "var(--border-color)",
        inputBg: "var(--input-bg)",
        inputBorder: "var(--input-border)",
        modalBg: "var(--modal-bg)",
        editorBg: "var(--editor-bg)",
        tableHeaderBg: "var(--table-header-bg)",
        cardHoverBg: "var(--card-hover-bg)",
        subtleBg: "var(--subtle-bg)",
        activeBg: "var(--active-bg)",

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
