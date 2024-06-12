import { ReactNode } from "react";

import { clsx } from "clsx/lite";

/**
 * Header component.
 *
 * @param props - The component props.
 * @param props.children - The child elements of the header.
 * @returns The rendered header component.
 */
const Header = (props: { children: ReactNode }): JSX.Element => {
    const { children } = props;

    return (
        <header
            className={clsx(
                "bg-gray-mist dark:bg-gray-darkest flex items-center justify-between p-4",
                "transition-colors duration-100 ease-out",
            )}
        >
            {children}
        </header>
    );
};

export default Header;
