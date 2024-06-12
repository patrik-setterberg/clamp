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
                // Dark mode.
                blue: "#8ab4f8",
                "blue-light": "#B4CFFA",
                "blue-dark": "#58739E",
                white: "#e8eaed",
                gray: "#444746",
                "gray-dark": "#333438",
                "gray-darker": "#2d2f31",
                "gray-darkest": "#28292a",
                black: "#202124",
                red: "#A63D40",
                "red-dark": "#853133",
                "red-light": "#B55654",
                yellow: "#EAC435",

                // Light mode.
                "blue-soft": "#83a6d4",
                "blue-sky": "#B4CFFA",
                "blue-ocean": "#58739E",
                "almost-black": "#231F1E",
                "gray-neutral": "#C0C2C4",
                "gray-mist": "#D9DBDD",
                "gray-pale": "#DDDEE0",
                "gray-silver": "#E4E6E8",
                "white-cloud": "#ECEEF0",
                "red-crimson": "#CC4B4B",
                "red-burgundy": "#993434",
                "red-salmon": "#F87171",
                "yellow-mustard": "#F6C453",
                "yellow-dark": "#DBA632",
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
    darkMode: "selector",
} satisfies Config;
