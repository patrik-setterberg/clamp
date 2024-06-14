// Components.
import ThemeSelector from "./ThemeSelector";

// Store.
import { useStore } from "../store/uiToolsStore";

// Assets.
import codeIcon from "../assets/images/code.svg";
import codeIconDarkMode from "../assets/images/code-dark-mode.svg";

import { clsx } from "clsx/lite";

/**
 * Header component.
 *
 * @param props - The component props.
 * @param props.children - The child elements of the header.
 * @returns The rendered header component.
 */
const Header = (): JSX.Element => {
    const theme = useStore((state) => state.theme);

    return (
        <header
            className={clsx(
                "bg-gray-mist dark:bg-gray-darkest flex items-center justify-between p-4",
                "transition-colors duration-100 ease-out",
            )}
        >
            <div className="flex items-center">
                <img
                    src={theme === "dark" ? codeIconDarkMode : codeIcon}
                    alt="Code icon"
                    className="h-8 w-8"
                    aria-hidden="true"
                />
                <h1
                    className={clsx(
                        "text-almost-black ml-2 text-xl font-bold dark:text-white",
                        "transition-colors duration-100 ease-out",
                    )}
                >
                    clamp.zone
                </h1>
            </div>
            <ThemeSelector />
        </header>
    );
};

export default Header;
