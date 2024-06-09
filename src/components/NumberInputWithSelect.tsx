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
const NumberInputWithSelect = ({
    inputOnChange,
    inputValue,
    selectValue,
    selectOnChange,
    label,
    error,
    caution,
}: NumberInputWithSelectProps): JSX.Element => {

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

    return (
        <label className="relative flex flex-col text-xs">
            <span
                className={clsx(
                    "leading-1 absolute block w-fit -translate-y-1/2 translate-x-3 cursor-pointer rounded-sm bg-night px-1 tracking-wide",
                    "transition duration-100 ease-out",
                    error
                        ? "text-error"
                        : caution && !hasErrors
                          ? "text-caution"
                          : "text-white",
                )}
            >
                {label}
            </span>
            <input
                type="number"
                onChange={handleInputChange}
                value={inputValue}
                className={clsx(
                    "monospace w-full rounded-md border border-solid bg-transparent px-4 py-2 text-base tracking-wide text-white",
                    "transition duration-100 ease-out",
                    "focus-visible:outline-none",
                    error
                        ? "error border-error"
                        : caution && !hasErrors
                          ? "caution border-caution"
                          : "border-gray",
                )}
                aria-label={label}
            />
            <select
                name="unit"
                className={clsx(
                    "select",
                    "absolute right-[5px] top-1/2 h-8 -translate-y-1/2 cursor-pointer appearance-none rounded-[5px] bg-night px-2 pr-[1.625rem] text-[13px] font-semibold uppercase text-white outline-2 outline-offset-2 outline-transparent",
                    "hover:bg-onyx",
                    "focus-visible:bg-onyx focus-visible:outline-light-blue",
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
};

export default NumberInputWithSelect;
