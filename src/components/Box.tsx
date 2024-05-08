import { ReactNode } from "react";

const Box = (props: { children: ReactNode }): JSX.Element => {
    const { children } = props;
    return (
        <article className="w-fit min-w-[600px] rounded-lg bg-night p-3">
            <div></div>
            {children}
        </article>
    );
};

export default Box;
