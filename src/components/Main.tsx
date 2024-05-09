import { ReactNode } from "react";

/**
 * Main element component.
 *
 * @param props - The component props.
 * @param props.children - The child elements of the component.
 * @returns The rendered main element component.
 */
const Main = (props: { children: ReactNode }): JSX.Element => {
    const { children } = props;

    return (
        <main className="flex h-full justify-center text-black">
            <div className="flex w-full max-w-screen-2xl flex-col px-default pb-default pt-20">
                {children}
            </div>
        </main>
    );
};

export default Main;
