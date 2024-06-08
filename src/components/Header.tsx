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
        <header className="relative z-10 flex items-center justify-center bg-night">
            <div className="flex w-full justify-between p-4">{children}</div>
        </header>
    );
};

export default Header;
