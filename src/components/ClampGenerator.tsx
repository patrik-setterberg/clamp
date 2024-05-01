import { useState } from "react";

// Components
import Input from "./Input";
import RadioButtons from "./RadioButtons";

// Store
import { useStore } from "../store/uiToolsStore";

// Helpers
import generateClamp from "../helpers/generateClamp";

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
     * Errors
     */
    const [minViewportWidthError, setMinViewportWidthError] = useState<
        string | null
    >(null);
    const [maxViewportWidthError, setMaxViewportWidthError] = useState<
        string | null
    >(null);
    const [minValueError, setMinValueError] = useState<string | null>(null);
    const [maxValueError, setMaxValueError] = useState<string | null>(null);
    const [remSizeError, setRemSizeError] = useState<string | null>(null);

    /**
     * The generated clamp value.
     */
    const [clampValue, setClampValue] = useState("");

    /**
     * Set error states based on the errors returned from the generateClamp function.
     * @param errors - The errors returned from the generateClamp function.
     */
    const setErrors = (errors: { param: string; message: string }[]) => {
        errors.forEach(({ param, message }) => {
            switch (param) {
                case "minViewportWidth":
                    setMinViewportWidthError((prev) =>
                        prev ? `${prev}\n${message}` : message,
                    );
                    break;
                case "maxViewportWidth":
                    setMaxViewportWidthError((prev) =>
                        prev ? `${prev}\n${message}` : message,
                    );
                    break;
                case "minValue":
                    setMinValueError((prev) =>
                        prev ? `${prev}\n${message}` : message,
                    );
                    break;
                case "maxValue":
                    setMaxValueError((prev) =>
                        prev ? `${prev}\n${message}` : message,
                    );
                    break;
                case "remSize":
                    setRemSizeError((prev) =>
                        prev ? `${prev}\n${message}` : message,
                    );
                    break;
                default:
                    break;
            }
        });
    };

    /**
     * Clear error states.
     */
    const clearErrors = () => {
        setMinViewportWidthError(null);
        setMaxViewportWidthError(null);
        setMinValueError(null);
        setMaxValueError(null);
        setRemSizeError(null);
    };

    /**
     * Handle the form submission event.
     * @param event - The form submission event.
     */
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        clearErrors();

        const { result, errors } = generateClamp(
            minViewportWidth,
            maxViewportWidth,
            minValue,
            maxValue,
            unit as "px" | "rem",
            remSize,
        );

        if (errors) {
            setErrors(errors);
        } else {
            typeof result === "string" && setClampValue(result);
        }
    };

    return (
        <section className="z-10">
            <h2>Clamp Generator</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <form onSubmit={submitHandler} className="flex flex-col gap-2">
                <Input
                    type="number"
                    onChange={setMinViewportWidth}
                    label="Min viewport width"
                    value={String(minViewportWidth)}
                    error={minViewportWidthError}
                />
                <Input
                    type="number"
                    onChange={setMaxViewportWidth}
                    label="Max viewport width"
                    value={String(maxViewportWidth)}
                    error={maxViewportWidthError}
                />
                <Input
                    type="number"
                    onChange={setMinValue}
                    label="Min value"
                    value={String(minValue)}
                    error={minValueError}
                />
                <Input
                    type="number"
                    onChange={setMaxValue}
                    label="Max value"
                    value={String(maxValue)}
                    error={maxValueError}
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
                    error={remSizeError}
                />
                <button
                    type="submit"
                    className="w-fit border bg-blue px-4 py-2 text-light"
                >
                    Clamp!
                </button>
            </form>
            <p>CLAMP: {clampValue}</p>
        </section>
    );
};

export default ClampGenerator;
