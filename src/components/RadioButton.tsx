type RadioButtonProps = {
    name: string;
    value: string;
    label: string;
    selected: boolean;
    onChange: () => void;
};

/**
 * Radio button component.
 */
const RadioButton = (props: RadioButtonProps): JSX.Element => {
    const { name, value, label, selected, onChange } = props;

    return (
        <label>
            <input
                type="radio"
                name={name}
                value={value}
                defaultChecked={selected}
                onChange={onChange}
            />
            {label}
        </label>
    );
};

export default RadioButton;
