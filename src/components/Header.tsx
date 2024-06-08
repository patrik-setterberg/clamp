import { ReactNode } from "react";

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
        <header className="flex items-center bg-night p-4">
            {children}
        </header>
    );
};

export default Header;
