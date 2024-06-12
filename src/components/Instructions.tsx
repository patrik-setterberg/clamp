import { clsx } from "clsx/lite";

// Store.
import { useStore } from "../store/uiToolsStore";

// Assets.
import close from "../assets/images/close.svg";

const Instructions = (): JSX.Element => {
    const setShowInstructions = useStore((state) => state.setShowInstructions);

    return (
        <article
            className={clsx(
                "bg-white dark:bg-gray-dark my-4 flex gap-4 rounded-md text-[0.8125rem]",
                "transition-colors duration-100 ease-out",
            )}
        >
            <div
                className={clsx(
                    "text-almost-black flex-grow px-4 py-3 dark:text-white",
                    "transition-colors duration-100 ease-out",
                )}
            >
                <p className="mb-2">
                    Create linearly scaling fluid size values based on viewport
                    width.
                </p>
                <p className="mb-2">
                    Enter values and resize your browser window to instantly see
                    your <code className="font-semibold">clamp()</code> in
                    action, and then hit the Copy button to copy the code to
                    your clipboard.
                </p>
                <p className="">
                    <span className="font-bold">Note:</span> This tool assumes{" "}
                    <code className="font-semibold">1rem</code> equals{" "}
                    <code className="font-semibold">16px</code>, as that's the
                    default in most browsers.
                </p>
            </div>
            <button
                title="Hide instructions"
                className={clsx(
                    "hide-instructions bg-blue-soft h-fit shrink-0 rounded-bl-md rounded-tr-md p-1.5 outline outline-2 outline-offset-2 outline-transparent dark:bg-blue",
                    "transition-colors duration-100 ease-out",
                    "hover:bg-blue-sky dark:hover:bg-blue-light",
                    "focus-visible:outline-blue-soft dark:focus-visible:outline-blue focus-visible:bg-blue-sky dark:focus-visible:bg-blue-light",
                )}
                onClick={() => setShowInstructions(false)}
            >
                <span className="sr-only">Hide instructions</span>
                <img src={close} alt="Close icon" aria-hidden="true" />
            </button>
        </article>
    );
};

export default Instructions;
