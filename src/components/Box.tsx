import { ReactNode } from "react";

const Box = (props: { children: ReactNode }): JSX.Element => {
    const { children } = props;
    return (
        <article className="w-full max-w-[640px] mx-auto rounded-lg bg-night py-4 px-4">
            {children}
        </article>
    );
};

export default Box;
