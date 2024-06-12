import { clsx } from "clsx/lite";

import githubIcon from "../assets/images/github-mark.svg";
import githubIconDarkMode from "../assets/images/github-mark-dark-mode.svg";

// Store
import { useStore } from "../store/uiToolsStore";

/**
 * The <footer> element component of the application.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = (): JSX.Element => {
    const REPO_URL = "https://github.com/patrik-setterberg/clamp";

    const theme = useStore((state) => state.theme);

    return (
        <footer className="flex justify-center p-4">
            <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View this project on GitHub"
                className={clsx(
                    "rounded-full outline outline-2 outline-offset-2 outline-transparent",
                    "transition duration-100 ease-out",
                    "focus-visible:outline-blue-soft dark:focus-visible:outline-blue",
                )}
            >
                <img
                    src={theme === "dark" ? githubIconDarkMode : githubIcon}
                    alt="GitHub icon"
                    className="h-7 w-7 transition duration-100 hover:scale-[1.05]"
                    aria-hidden="true"
                />
            </a>
        </footer>
    );
};

export default Footer;
