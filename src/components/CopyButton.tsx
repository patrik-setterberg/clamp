import clsx from "clsx/lite";

import copy from "../assets/images/copy.svg";
import done from "../assets/images/done.svg";

type CopyButtonProps = {
    classNames?: string;
    copySuccess: boolean;
};

/**
 * CopyButton component. Used as submit handler for Clamp Generator form.
 * Submission will copy the generated CSS clamp value to the clipboard.
 *
 * Some styling in App.css.
 *
 * @component
 * @param {CopyButtonProps} props - The props for the CopyButton component.
 * @param {string} props.classNames - Additional CSS classes for the button.
 * @param {boolean} props.copySuccess - Indicates whether the copy operation was successful.
 * @returns {JSX.Element} The rendered CopyButton component.
 */
const CopyButton = (props: CopyButtonProps): JSX.Element => {
    const { classNames, copySuccess } = props;



    return (
        <button
            type="submit"
            className={clsx(
                "copy-button",
                "flex w-full sm:w-fit justify-center rounded-md bg-blue px-[22px] py-3 text-sm font-bold text-black outline-2 outline-offset-2 outline-transparent sm:rounded-l-none sm:px-4",
                "hover:bg-light-blue",
                "focus-visible:bg-light-blue focus-visible:outline-blue",
                "transition-colors duration-100 ease-out",
                classNames,
            )}
            aria-label="Copy to clipboard"
        >
            <div className="flex origin-bottom items-center gap-[5px]">
                <div className="relative h-5 w-5">
                    <img
                        src={copy}
                        className={clsx(
                            "absolute",
                            "transition duration-100 ease-out",
                            copySuccess ? "opacity-0" : "opacity-100",
                        )}
                        alt="Copy icon"
                        aria-hidden="true"
                    />
                    <img
                        src={done}
                        className={clsx(
                            "absolute",
                            "transition duration-100 ease-out",
                            copySuccess ? "opacity-100" : "opacity-0",
                        )}
                        alt="Checkmark icon"
                        aria-hidden="true"
                    />
                </div>
                <span>Copy</span>
            </div>

            <div aria-live="polite" className="sr-only">
                {copySuccess ? "Copied to clipboard" : ""}
            </div>
        </button>
    );
};

export default CopyButton;
