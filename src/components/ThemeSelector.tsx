import { clsx } from "clsx/lite";

// Store.
import { useStore } from "../store/uiToolsStore";

// Assets.
import sunIconLightMode from "../assets/images/sun-light-mode.svg";
import sunIconDarkMode from "../assets/images/sun-dark-mode.svg";
import moonIconLightMode from "../assets/images/moon-light-mode.svg";
import moonIconDarkMode from "../assets/images/moon-dark-mode.svg";

/**
 * Renders a button that allows the user to toggle between light and dark themes.
 * The button displays a sun icon in light mode and a moon icon in dark mode.
 *
 * @component
 * @returns The rendered ThemeSelector component.
 */
const ThemeSelector = (): JSX.Element => {
    const theme = useStore((state) => state.theme);
    const setTheme = useStore((state) => state.setTheme);

    const sharedIconClasses =
        "absolute top-50 transition duration-1000 ease-out top-[50%] left-[50%]";

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    return (
        <button
            className={clsx(
                "text-burgundy relative h-10 w-10 overflow-hidden rounded-full outline outline-2 outline-transparent",
                "transition duration-100 ease-out",
                "dark:hover:bg-gray-dark hover:scale-[1.075] hover:bg-white",
                "focus-visible:outline-blue-soft dark:focus-visible:outline-blue-light",
                "active:scale-[0.95]",
            )}
            title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
            <img
                src={moonIconDarkMode}
                className={`icon sun ${sharedIconClasses} ${theme === "dark" ? "icon-rise opacity-100" : "icon-set opacity-0"}`}
                alt="Sun icon"
                aria-hidden="true"
            />
            <img
                src={moonIconLightMode}
                className={`icon sun ${sharedIconClasses} ${theme === "dark" ? "icon-rise opacity-0" : "icon-set opacity-100"}`}
                alt="Sun icon"
                aria-hidden="true"
            />
            <img
                src={sunIconDarkMode}
                className={`icon moon ${sharedIconClasses} ${theme === "light" ? "icon-rise opacity-0" : "icon-set opacity-100"}`}
                alt="Moon icon"
                aria-hidden="true"
            />
            <img
                src={sunIconLightMode}
                className={`icon moon ${sharedIconClasses} ${theme === "light" ? "icon-rise opacity-100" : "icon-set opacity-0"}`}
                alt="Moon icon"
                aria-hidden="true"
            />
        </button>
    );
};

export default ThemeSelector;
