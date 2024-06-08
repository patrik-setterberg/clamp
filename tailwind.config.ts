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
                white: "#e8eaed",
                onyx: "#333438",
                dark: "#2d2f31",
                night: "#28292a",
                black: "#202124",
                error: "#A63D40",
                "error-dark": "#853133",
                "error-bright": "#B55654",
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
