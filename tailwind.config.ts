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
            colors: {
                blue: "#8ab4f8",
                "light-blue": "#B4CFFA",
                "dark-blue": "#58739E",
                gray: "#444746",
                white: {
                    // #e8eaed
                    50: "rgba(232, 234, 237, 0.1)",
                    100: "rgba(232, 234, 237, 0.2)",
                    200: "rgba(232, 234, 237, 0.3)",
                    300: "rgba(232, 234, 237, 0.4)",
                    400: "rgba(232, 234, 237, 0.5)",
                    500: "rgba(232, 234, 237, 0.6)",
                    600: "rgba(232, 234, 237, 0.7)",
                    700: "rgba(232, 234, 237, 0.8)",
                    800: "rgba(232, 234, 237, 0.9)",
                    DEFAULT: "rgba(232, 234, 237, 1)",
                },
                onyx: "#333438",
                dark: "#2d2f31",
                night: "#28292a",
                black: "#202124",
                error: "#A63D40",
                "error-dark": "#853133",
                "error-bright": "#B55654",
                caution: "#EAC435",
            },
            maxWidth: {
                box: "640px",
            },
            transitionProperty: {
                colors: "background-color, border-color, color, fill, stroke, outline-color, text-decoration-color",
            },
            translate: {},
        },
    },
    variants: {
        extend: {
            appearance: ["responsive"],
            display: ["first"],
        },
    },
    plugins: [],
} satisfies Config;
