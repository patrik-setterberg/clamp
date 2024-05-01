import clsx from "clsx/lite";

type ButtonProps = { classNames?: string; label: string; func: () => void };

/**
 * Button component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.classNames - The CSS classes for the button.
 * @param {string} props.label - The label text for the button.
 * @param {Function} props.func - The function to be called when the button is clicked.
 * @returns {JSX.Element} The rendered button component.
 */
const Button = (props: ButtonProps): JSX.Element => {
    const { classNames, label, func } = props;

    const defaultClasses =
        "py-2 px-4 rounded-md bg-blue text-light transition-colors duration-100 ease-out font-semibold w-fit";
    const hoverClasses = "hover:bg-dark hover:text-white";
    const focusClasses =
        "focus:outline-dashed focus:outline-blue focus:outline-offset-2 hover:focus:outline-dark focus:outline-2";
    const activeClasses = "active:transform active:scale-95 active:bg-dark";

    return (
        <button
            className={clsx(
                defaultClasses,
                hoverClasses,
                focusClasses,
                activeClasses,
                classNames,
            )}
            onClick={func}
        >
            {label}
        </button>
    );
};

export default Button;
