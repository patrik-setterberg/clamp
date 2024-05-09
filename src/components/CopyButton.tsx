import clsx from "clsx/lite";

import copy from "../assets/images/copy.svg";
import done from "../assets/images/done.svg";

type CopyButtonProps = {
    classNames?: string;
    onClick?: () => void;
    copySuccess: boolean;
};

/**
 * Copy Button component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.classNames - The CSS classes for the button.
 * @param {string} props.label - The label text for the button.
 * @param {Function} props.func - The function to be called when the button is clicked.
 * @returns {JSX.Element} The rendered button component.
 */
const CopyButton = (props: CopyButtonProps): JSX.Element => {
    const { classNames, onClick, copySuccess } = props;

    const defaultClasses =
        "py-[11px] px-4 rounded-md bg-blue text-black text-sm transition-colors duration-150 ease-out font-semibold w-fit flex items-center gap-[5px]";
    const hoverClasses = "hover:bg-light-blue";
    const focusClasses =
        "focus:outline-dashed focus:outline-slate focus:outline-offset-2 hover:focus:outline-onyx focus:outline-2";
    const activeClasses = "active:transform active:scale-95";

    const iconClasses = "absolute transition duration-150 ease-out";

    return (
        <button
            type="submit"
            className={clsx(
                defaultClasses,
                hoverClasses,
                focusClasses,
                activeClasses,
                classNames,
            )}
            onClick={onClick}
        >
            <div className="relative h-5 w-5">
                <img
                    src={copy}
                    className={clsx(
                        iconClasses,
                        copySuccess ? "opacity-0" : "opacity-100",
                    )}
                    alt="copy icon"
                />
                <img
                    src={done}
                    className={clsx(
                        iconClasses,
                        copySuccess ? "opacity-100" : "opacity-0",
                    )}
                    alt="checkmark icon"
                />
            </div>
            Copy
            <span className="sr-only">Copy to clipboard</span>
        </button>
    );
};

export default CopyButton;
