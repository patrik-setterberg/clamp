import RadioButton from "./RadioButton";

type RadioItem = {
    label: string;
    value: string;
};

type RadioButtonsProps = {
    name: string;
    items: RadioItem[];
    selectedValue: string;
    onChange: (value: "px" | "rem") => void;
};

/**
 * Renders a group of radio buttons.
 *
 * @component
 * @param {RadioButtonsProps} props - The props for the RadioButtons component.
 * @returns {JSX.Element} The rendered RadioButtons component.
 */
const RadioButtons = ({
    name,
    items,
    selectedValue,
    onChange,
}: RadioButtonsProps): JSX.Element => {
    return (
        <fieldset>
            {items.map((item: any) => {
                return (
                    <RadioButton
                        key={item.value}
                        name={name}
                        value={item.value}
                        label={item.label}
                        selected={selectedValue === item.value}
                        onChange={() => onChange(item.value)}
                    />
                );
            })}
        </fieldset>
    );
};

export default RadioButtons;
