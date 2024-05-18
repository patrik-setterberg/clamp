import { ReactNode } from "react";

/**
 * A reusable box component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be rendered inside the box.
 * @returns {JSX.Element} The rendered box component.
 */
const Box = (props: { children: ReactNode }): JSX.Element => {
    const { children } = props;
    return (
        <article className="w-full max-w-[640px] mx-auto rounded-lg bg-night py-4 px-4">
            {children}
        </article>
    );
};

export default Box;
