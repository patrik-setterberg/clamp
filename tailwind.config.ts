export default {
  content: ["./src/**/*.{html,tsx}", "./index.html"],
  theme: {
    extend: {
      spacing: {
        default: "clamp(1rem, 1.3333vw + .5rem, 2rem)",
      },
      colors: {
        white: "#fdfcfd",
        light: "#f9f5f8",
        dark: "#1d1d1d",
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
} as Record<string, unknown>;
