import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,tsx}", "./index.html"],
  /**
   * Theme configuration.
   * Clamps use
   * - minimum viewport width: 500px
   * - maximum viewport width: 1600px
   */

  theme: {
    extend: {
      spacing: {
        default: "clamp(1rem, 0.727vw + 0.773rem, 1.5rem)",
      },
      colors: {
        white: "#fdfcfd",
        light: "#f3f3f3",
        blue: "#698996",
        dark: "#222831",
        black: "#1d1d1d",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        spin: "spin 240s linear infinite",
        "spin-reverse": "spin 240s linear infinite reverse",
      },
    },
  },
  plugins: [],
} satisfies Config;
