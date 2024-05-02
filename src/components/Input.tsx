import clsx from "clsx/lite";

type InputProps = {
    type: string;
    value: string;
    onChange: (value: number) => void;
    label: string;
    error: boolean;
};


/**
 * Input component for handling numeric user input.
 */
const Input = ({
    type,
    onChange,
    value,
    label,
    error,
}: InputProps): JSX.Element => {
    // Check for invalid type prop.
    // TODO: Add handling for other types.
    if (!["number"].includes(type)) {
        throw new Error("Invalid input type");
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(event.target.value));
    };

    return (
        <label>
            {label}
            <input
                type={type}
                onChange={handleChange}
                value={value}
                className={clsx("px-4 py-2 text-light", error && "border border-red-500")}
                aria-label={label}
            />
            {/* {error && <span>{error}</span>} */}
        </label>
    );
};

export default Input;
