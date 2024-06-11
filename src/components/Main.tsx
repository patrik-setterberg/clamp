import { ReactNode } from "react";

/**
 * The <main> element component of the application.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child elements to render inside the main component.
 * @returns {JSX.Element} The rendered main component.
 */
const Main = (props: { children: ReactNode }): JSX.Element => {
    const { children } = props;

    return (
        <main className="flex h-full flex-grow flex-col px-4 pb-10 pt-20">
            {children}
        </main>
    );
};

export default Main;
