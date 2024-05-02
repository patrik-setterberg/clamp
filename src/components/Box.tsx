import { ReactNode } from "react";

const Box = (props: { children: ReactNode }): JSX.Element => {
    const { children } = props;
    return (
        <article className="shadow-box w-fit min-w-[600px] rounded-md bg-white p-4">
            {children}
        </article>
    );
};

export default Box;
