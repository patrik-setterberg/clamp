import { useEffect, useState, Fragment } from "react";

// Components
import Input from "./Input";
import RadioButtons from "./RadioButtons";
import Button from "./Button";

// Store
import { useStore } from "../store/uiToolsStore";

// Helpers
import generateClamp from "../helpers/generateClamp";

// Hooks
import useTypingEffect from "../hooks/useTypingEffect";

/**
 * A component that generates a CSS clamp value based on user input.
 */
const ClampGenerator = (): JSX.Element => {
    /**
     * The minimum viewport width value.
     */
    const { minViewportWidth, setMinViewportWidth } = useStore((state) => ({
        minViewportWidth: state.minViewportWidth,
        setMinViewportWidth: state.setMinViewportWidth,
    }));

    /**
     * The maximum viewport width value.
     */
    const { maxViewportWidth, setMaxViewportWidth } = useStore((state) => ({
        maxViewportWidth: state.maxViewportWidth,
        setMaxViewportWidth: state.setMaxViewportWidth,
    }));

    /**
     * The minimum value for the clamp.
     */
    const { minValue, setMinValue } = useStore((state) => ({
        minValue: state.minValue,
        setMinValue: state.setMinValue,
    }));

    /**
     * The maximum value for the clamp.
     */
    const { maxValue, setMaxValue } = useStore((state) => ({
        maxValue: state.maxValue,
        setMaxValue: state.setMaxValue,
    }));

    /**
     * The unit of measurement for the clamp value.
     */
    const { unit, setUnit } = useStore((state) => ({
        unit: state.unit,
        setUnit: state.setUnit,
    }));

    /**
     * The base font size in pixels for calculating rem values.
     */
    const { remSize, setRemSize } = useStore((state) => ({
        remSize: state.remSize,
        setRemSize: state.setRemSize,
    }));

    /**
     * The generated clamp value.
     */
    const [clampValue, setClampValue] = useState("");

    /**
     * Error handling.
     */
    type ErrorFields = {
        minViewportWidth?: string;
        maxViewportWidth?: string;
        minValue?: string;
        maxValue?: string;
        remSize?: string;
    };

    const [errors, setErrors] = useState<ErrorFields>({});
    const [errorMessages, setErrorMessages] = useState("");

    // We set error messages when the errors object changes.
    useEffect(() => {
        setErrorMessages(
            Object.values(errors)
                .filter((error, index, self) => self.indexOf(error) === index)
                .join("\n"),
        );
    }, [errors]);

    const TYPING_SPEED = 20;
    const VARIANCE = 40;
    const typedErrors = useTypingEffect(errorMessages, TYPING_SPEED, VARIANCE);
    const typedClampValue = useTypingEffect(clampValue, TYPING_SPEED, VARIANCE);

    /**
     * Handle the form submission event.
     * @param event - The form submission event.
     */
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrors({});

        const { result, errors: newErrors } = generateClamp(
            minViewportWidth,
            maxViewportWidth,
            minValue,
            maxValue,
            unit as "px" | "rem",
            remSize,
        );

        if (newErrors) {
            const errorObject: ErrorFields = newErrors.reduce((acc, curr) => {
                return { ...acc, [curr.param]: curr.message };
            }, {});

            setErrors(errorObject);
        } else {
            typeof result === "string" && setClampValue(result);
        }
    };

    return (
        <section className="z-10">
            <h2>Clamp Generator</h2>
            <form onSubmit={submitHandler} className="flex flex-col gap-2">
                <Input
                    type="number"
                    onChange={setMinViewportWidth}
                    label="Min viewport width"
                    value={String(minViewportWidth)}
                    error={errors.minViewportWidth !== undefined}
                />
                <Input
                    type="number"
                    onChange={setMaxViewportWidth}
                    label="Max viewport width"
                    value={String(maxViewportWidth)}
                    error={errors.maxViewportWidth !== undefined}
                />
                <Input
                    type="number"
                    onChange={setMinValue}
                    label="Min value"
                    value={String(minValue)}
                    error={errors.minValue !== undefined}
                />
                <Input
                    type="number"
                    onChange={setMaxValue}
                    label="Max value"
                    value={String(maxValue)}
                    error={errors.maxValue !== undefined}
                />
                <RadioButtons
                    name="unit"
                    items={[
                        { label: "px", value: "px" },
                        { label: "rem", value: "rem" },
                    ]}
                    selectedValue={unit}
                    onChange={setUnit}
                />
                <Input
                    type="number"
                    onChange={setRemSize}
                    label="Rem size"
                    value={String(remSize)}
                    error={errors.remSize !== undefined}
                />
                <Button type="submit" label="Generate Clamp" />
            </form>
            {typedErrors ? (
                <div className="block text-red-800">
                    {typedErrors.split("\n").map((line, index) => (
                        <Fragment key={index}>
                            {line}
                            <br />
                        </Fragment>
                    ))}
                </div>
            ) : (
                <p>{typedClampValue}</p>
            )}
        </section>
    );
};

export default ClampGenerator;
