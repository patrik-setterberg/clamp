import { clsx } from "clsx/lite";
import githubIcon from "../assets/images/github-mark-white.svg";

/**
 * The <footer> element component of the application.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child elements to render inside the main component.
 * @returns {JSX.Element} The rendered main component.
 */
const Footer = (): JSX.Element => {
    const REPO_URL = "https://github.com/patrik-setterberg/clamp";

    return (
        <footer className="flex justify-center p-4">
            <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View this project on GitHub"
                className={clsx(
                    "rounded-full outline-2 outline-offset-2 outline-transparent transition-colors duration-100 ease-out",
                    "focus-visible:outline-blue",
                )}
            >
                <img
                    src={githubIcon}
                    alt="GitHub icon"
                    className="h-7 w-7 transition duration-100 hover:scale-[1.05]"
                    aria-hidden="true"
                />
            </a>
        </footer>
    );
};

export default Footer;
