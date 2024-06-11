import { clsx } from "clsx/lite";

// Store.
import { useStore } from "../store/uiToolsStore";

// Assets.
import close from "../assets/images/close.svg";

const Instructions = (): JSX.Element => {
    const setShowInstructions = useStore((state) => state.setShowInstructions);

    return (
        <article className="my-4 flex gap-4 overflow-hidden rounded-md bg-onyx text-[0.8125rem]">
            <div className="flex-grow px-4 py-3 text-white">
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
                    "hide-instructions h-fit shrink-0 rounded-bl-md rounded-tr-md bg-white-50 p-2 transition duration-150",
                    "hover:bg-white-100",
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
