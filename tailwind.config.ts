import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        go: {
          ink: "var(--color-ink)",
          "ink-soft": "var(--color-ink-soft)",
          gold: "var(--color-gold)",
          "gold-hover": "var(--color-gold-hover)",
          "gold-dark": "var(--color-gold-dark)",
          cream: "var(--color-cream)",
          paper: "var(--color-paper)",
          border: "var(--color-border)",
          muted: "var(--color-muted)",
          "muted-light": "var(--color-muted-light)",
          success: "var(--color-success)",
          warning: "var(--color-warning)",
          danger: "var(--color-danger)",
          info: "var(--color-info)",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        surfaceElevated: "var(--surface-elevated)",
        surfaceMuted: "var(--surface-muted)",
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
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        border: "var(--border)",
        ring: "var(--ring)",
        success: "var(--success)",
        warning: "var(--warning)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Geist", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-lg": ["3.5rem", { lineHeight: "1", letterSpacing: "-0.035em" }],
        "display-md": ["2.75rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "heading-xl": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "heading-lg": ["2rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "heading-md": ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "heading-sm": ["1.25rem", { lineHeight: "1.25" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body-md": ["1rem", { lineHeight: "1.55" }],
        "body-sm": ["0.875rem", { lineHeight: "1.45" }],
        caption: ["0.75rem", { lineHeight: "1.35" }],
        label: ["0.8125rem", { lineHeight: "1.2", fontWeight: "600" }],
        button: ["0.9375rem", { lineHeight: "1", fontWeight: "700" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
        pill: "999px",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        popover: "var(--shadow-popover)",
        card: "var(--shadow-card)",
        sticky: "var(--shadow-sticky)",
      },
      transitionDuration: {
        fast: "120ms",
        normal: "180ms",
        modal: "220ms",
        slow: "300ms",
      },
      maxWidth: {
        marketing: "1280px",
        app: "1440px",
      },
      keyframes: {
        "progress-indeterminate": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(400%)" },
        },
      },
      animation: {
        "progress-indeterminate": "progress-indeterminate 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
