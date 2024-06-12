import { ReactNode } from "react";
import clsx from "clsx/lite";

type LinkProps = {
    href: string;
    children: ReactNode;
    newTab?: boolean;
};

/**
 * A custom link component.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.href - The URL of the link.
 * @param {ReactNode} props.children - The content of the link.
 * @param {boolean} props.newTab - Whether to open the link in a new tab.
 * @returns {JSX.Element} The rendered link component.
 */
const Link = ({ href, children, newTab }: LinkProps): JSX.Element => {
    const linkProps = newTab
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {};

    return (
        <a
            href={href}
            className={clsx(
                "decoration text-blue-ocean rounded-sm font-bold underline decoration-current underline-offset-[1px] outline outline-2 outline-offset-2 outline-transparent dark:text-blue",
                "transition-colors duration-100 ease-out",
                "hover:text-blue-ocean dark:hover:text-blue-light hover:!decoration-current hover:decoration-2",
                "focus-visible:text-blue-ocean dark:focus-visible:text-blue-light hover:focus-visible:outline-transparent focus-visible:decoration-transparent focus-visible:outline-current",
            )}
            {...linkProps}
        >
            {children}
        </a>
    );
};

export default Link;
