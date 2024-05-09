import clsx from "clsx/lite";

type NumberInputWithSelectProps = {
    inputValue: string;
    inputOnChange: (value: number) => void;
    selectValue: string;
    selectOnChange: (value: "px" | "rem") => void;
    label: string;
    error: boolean;
};

/**
 * Input component for handling numeric user input with a select dropdown for units (px & rem).
 */
const NumberInputWithSelect = ({
    inputOnChange,
    inputValue,
    selectValue,
    selectOnChange,
    label,
    error,
}: NumberInputWithSelectProps): JSX.Element => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        inputOnChange(Number(event.target.value));
    };

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

    const focusClasses =
        "focus:outline-dashed focus:outline-offset-2 hover:focus:outline-slate focus:outline-2";

    const selectWidthClass =
        selectValue === "rem" ? "w-[3.75rem]" : "w-[3.125rem]";

    return (
        <label className="relative flex flex-col text-xs">
            <span
                className={clsx(
                    "bg-night absolute block w-fit -translate-y-1/2 translate-x-3 px-1 tracking-wide transition duration-150 ease-out",
                    error ? "text-error" : "text-white",
                )}
            >
                {label}
            </span>
            <input
                type="number"
                onChange={handleInputChange}
                value={inputValue}
                className={clsx(
                    "w-full monospace rounded-md border border-solid bg-transparent px-4 py-2 text-base tracking-wide text-white transition duration-150 ease-out",
                    error ? "border-error" : "border-gray focus:outline-slate",
                    focusClasses,
                )}
                aria-label={label}
            />
            <select
                name="unit"
                className={clsx(
                    "select bg-night hover:bg-onyx absolute right-[5px] top-1/2 h-8 -translate-y-1/2 cursor-pointer appearance-none rounded-[5px] px-2 pr-[1.625rem] text-[13px] font-semibold uppercase text-white transition duration-150 ease-out focus:bg-dark focus:outline-none",
                    selectWidthClass,
                )}
                value={selectValue}
                onChange={handleSelectChange}
            >
                <option value="px">px</option>
                <option value="rem">rem</option>
            </select>
            {/* {error && <span>{error}</span>} */}
        </label>
    );
};

export default NumberInputWithSelect;
