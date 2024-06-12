import { ReactNode } from "react";

import clsx from "clsx/lite";

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
        <article
            className={clsx(
                "bg-white-cloud dark:bg-gray-darkest mx-auto w-full max-w-box rounded-lg px-4 py-4",
                "transition-colors duration-100 ease-out",
            )}
        >
            {children}
        </article>
    );
};

export default Box;
