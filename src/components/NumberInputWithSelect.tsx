import { forwardRef } from "react";

import clsx from "clsx/lite";

// Store.
import { useStore } from "../store/uiToolsStore";

type NumberInputWithSelectProps = {
    inputValue: string;
    inputOnChange: (value: number) => void;
    selectValue: string;
    selectOnChange: (value: "px" | "rem") => void;
    label: string;
    error: boolean;
    caution: boolean;
};

/**
 * A custom number input component with a select dropdown for unit selection.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.inputOnChange - The callback function to handle input value changes.
 * @param {number} props.inputValue - The current value of the number input.
 * @param {string} props.selectValue - The selected unit value.
 * @param {Function} props.selectOnChange - The callback function to handle select value changes.
 * @param {string} props.label - The label for the number input.
 * @param {boolean} props.error - Indicates whether there is an error with the input value.
 * @param {boolean} props.caution - Indicates whether there is a caution message associated with the input value.
 * @returns {JSX.Element} The rendered NumberInputWithSelect component.
 */
const NumberInputWithSelect = forwardRef<
    HTMLInputElement,
    NumberInputWithSelectProps
>((props, ref): JSX.Element => {
    const {
        label,
        inputValue,
        inputOnChange,
        selectValue,
        selectOnChange,
        error,
        caution,
    } = props;

    const hasErrors = useStore((state) => state.hasErrors);

    /**
     * Handles the change event of the input element.
     *
     * @param event - The change event object.
     */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        inputOnChange(Number(event.target.value));
    };

    /**
     * Handles the change event of the select element.
     * Converts the input value to the selected unit.
     * @param event - The change event.
     */
    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const val = event.target.value as "px" | "rem";
        selectOnChange(event.target.value as "px" | "rem");
        if (val === "px") {
            inputOnChange(Number(inputValue) * 16);
        } else {
            inputOnChange(Number(inputValue) / 16);
        }
    };

    let inputBorderColorClass =
        "border-gray-neutral dark:border-gray focus-visible:border-transparent";
    if (error) inputBorderColorClass = "border-red-burgundy dark:border-red";
    if (caution && !hasErrors)
        inputBorderColorClass = "border-yellow-dark dark:border-yellow-mustard";

    let inputOutlineClass =
        "focus-visible:outline-blue-soft dark:focus-visible:outline-blue-light";
    if (error)
        inputOutlineClass =
            "focus-visible:outline-red-burgundy dark:focus-visible:outline-red";
    if (caution && !hasErrors)
        inputOutlineClass =
            "focus-visible:outline-yellow-dark dark:focus-visible:outline-yellow-mustard";

    return (
        <label className="relative flex flex-col text-xs">
            <span
                className={clsx(
                    "leading-1 bg-white-cloud dark:bg-gray-darkest absolute block w-fit -translate-y-1/2 translate-x-3 cursor-pointer rounded-sm px-1 tracking-wide",
                    "transition duration-100 ease-out",
                    error
                        ? "text-red-burgundy dark:text-red"
                        : caution && !hasErrors
                          ? "text-yellow-dark dark:text-yellow-mustard"
                          : "text-almost-black dark:text-white",
                )}
            >
                {label}
            </span>
            <input
                ref={ref}
                type="number"
                onChange={handleInputChange}
                value={inputValue}
                className={clsx(
                    "monospace text-almost-black w-full rounded-md border border-solid bg-transparent px-4 py-2 text-base tracking-wide outline outline-2 outline-transparent dark:text-white",
                    "transition-colors duration-100 ease-out",
                    error && "error",
                    caution && !hasErrors && "caution",
                    (error || caution) && "focus-visible:border-transparent",
                    inputBorderColorClass,
                    inputOutlineClass,
                )}
                aria-label={label}
            />
            <select
                name="unit"
                className={clsx(
                    "select",
                    "bg-white-cloud dark:bg-gray-darkest text-almost-black absolute right-[5px] top-1/2 h-8 -translate-y-1/2 cursor-pointer appearance-none rounded-[5px] px-2 pr-[1.625rem] text-[13px] font-semibold uppercase outline outline-2 outline-offset-2 outline-transparent dark:text-white",
                    "hover:bg-gray-silver dark:hover:bg-gray-dark",
                    "focus-visible:bg-gray-silver dark:focus-visible:bg-gray-dark focus-visible:outline-blue-soft dark:focus-visible:outline-blue-light",
                    "transition-colors duration-100 ease-out ",
                    selectValue === "rem" ? "w-[3.75rem]" : "w-[3.125rem]",
                )}
                value={selectValue}
                onChange={handleSelectChange}
                aria-label="Select unit"
            >
                <option value="px">px</option>
                <option value="rem">rem</option>
            </select>
        </label>
    );
});

export default NumberInputWithSelect;
