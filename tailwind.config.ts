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
        // https://coolors.co/151515-474448-6e8898-e9e7dd-f3f3eb-fcfff8
        // white: '#FCFFF8',
        // light: "#F3F3EB",
        // cream: '#E9E7DD',
        // slate: "#6E8898",
        // onyx: "#474448",
        // night: "#151515",

        gray: '#444746',
        white: '#e3e3e3',
        onyx: '#333438',
        dark: '#2d2f31',
        night: '#28292a',
      },
      translate: {},
      keyframes: {
        // Probably remove these.
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      // Probably remove these.
      animation: {
        spin: "spin 240s linear infinite",
        "spin-reverse": "spin 240s linear infinite reverse",
      },
    },
  },
  variants: {
    extend: {
      appearance: ['responsive'],
    }
  },
  plugins: [],
} satisfies Config;
