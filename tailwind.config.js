/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
        colors: {
            background: "var(--background)",
            foreground: "var(--foreground)",

            card: {
                DEFAULT: "var(--card)",
                foreground: "var(--card-foreground)",
            },

            popover: {
                DEFAULT: "var(--popover)",
                foreground: "var(--popover-foreground)",
            },

            primary: {
                DEFAULT: "var(--primary)",
                foreground: "var(--primary-foreground)",
            },

            secondary: {
                DEFAULT: "var(--secondary)",
                foreground: "var(--secondary-foreground)",
            },

            accent: {
                DEFAULT: "var(--accent)",
                foreground: "var(--accent-foreground)",
            },

            destructive: "var(--destructive)",

            border: "var(--border)",
            input: "var(--input)",
        },

        borderRadius: {
            sm: "var(--radius-sm)",
            md: "var(--radius-md)",
            lg: "var(--radius-lg)",
            xl: "var(--radius-xl)",
            "2xl": "var(--radius-2xl)",
            "3xl": "var(--radius-3xl)",
            "4xl": "var(--radius-4xl)",
        },

        fontFamily: {
            sans: ["var(--font-sans)"],
            heading: ["var(--font-heading)"],
            mono: ["var(--font-mono)"],
        },
    },
  },

  plugins: [],
};