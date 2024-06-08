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
        <article className="mx-auto w-full max-w-[640px] rounded-lg bg-night px-4 py-4">
            {children}
        </article>
    );
};

export default Box;
