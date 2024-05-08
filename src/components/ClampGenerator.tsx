import { useEffect, useState, Fragment } from "react";

// Components
import NumberInputWithSelect from "./NumberInputWithSelect";
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
     * The unit of the minimum viewport width.
     */
    const { minViewportWidthUnit, setMinViewportWidthUnit } = useStore(
        (state) => ({
            minViewportWidthUnit: state.minViewportWidthUnit,
            setMinViewportWidthUnit: state.setMinViewportWidthUnit,
        }),
    );

    /**
     * The maximum viewport width value.
     */
    const { maxViewportWidth, setMaxViewportWidth } = useStore((state) => ({
        maxViewportWidth: state.maxViewportWidth,
        setMaxViewportWidth: state.setMaxViewportWidth,
    }));

    /**
     * The unit of the maximum viewport width.
     */
    const { maxViewportWidthUnit, setMaxViewportWidthUnit } = useStore(
        (state) => ({
            maxViewportWidthUnit: state.maxViewportWidthUnit,
            setMaxViewportWidthUnit: state.setMaxViewportWidthUnit,
        }),
    );

    /**
     * The minimum value for the clamp.
     */
    const { minValue, setMinValue } = useStore((state) => ({
        minValue: state.minValue,
        setMinValue: state.setMinValue,
    }));

    /**
     * The unit of the minimum value for the clamp.
     */
    const { minValueUnit, setMinValueUnit } = useStore((state) => ({
        minValueUnit: state.minValueUnit,
        setMinValueUnit: state.setMinValueUnit,
    }));

    /**
     * The maximum value for the clamp.
     */
    const { maxValue, setMaxValue } = useStore((state) => ({
        maxValue: state.maxValue,
        setMaxValue: state.setMaxValue,
    }));

    /**
     * The unit of the maximum value for the clamp.
     */
    const { maxValueUnit, setMaxValueUnit } = useStore((state) => ({
        maxValueUnit: state.maxValueUnit,
        setMaxValueUnit: state.setMaxValueUnit,
    }));

    /**
     * The base font size in pixels for calculating rem values.
     */
    const { remSize } = useStore((state) => ({
        remSize: state.remSize,
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
            minViewportWidthUnit,
            maxViewportWidth,
            maxViewportWidthUnit,
            minValue,
            minValueUnit,
            maxValue,
            maxValueUnit,
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
        <section className="">
            <div className="">
                <h2 className="mb-10 text-lg font-bold uppercase">
                    Clamp Generator
                </h2>
            </div>

            <form
                onSubmit={submitHandler}
                className="grid grid-cols-2 gap-x-3 gap-y-4"
            >
                <NumberInputWithSelect
                    label="Min viewport width"
                    inputValue={String(minViewportWidth)}
                    inputOnChange={setMinViewportWidth}
                    selectValue={minViewportWidthUnit}
                    selectOnChange={setMinViewportWidthUnit}
                    error={errors.minViewportWidth !== undefined}
                />
                <NumberInputWithSelect
                    label="Max viewport width"
                    inputValue={String(maxViewportWidth)}
                    inputOnChange={setMaxViewportWidth}
                    selectValue={maxViewportWidthUnit}
                    selectOnChange={setMaxViewportWidthUnit}
                    error={errors.maxViewportWidth !== undefined}
                />
                <NumberInputWithSelect
                    label="Min value"
                    inputValue={String(minValue)}
                    inputOnChange={setMinValue}
                    selectValue={minValueUnit}
                    selectOnChange={setMinValueUnit}
                    error={errors.minValue !== undefined}
                />
                <NumberInputWithSelect
                    label="Max value"
                    inputValue={String(maxValue)}
                    inputOnChange={setMaxValue}
                    selectValue={maxValueUnit}
                    selectOnChange={setMaxValueUnit}
                    error={errors.maxValue !== undefined}
                />
                <div className="col-span-2 mt-4 flex justify-start">
                    <Button type="submit" label="Generate Clamp" />
                </div>
            </form>
            {typedErrors ? (
                <div className="monospace block text-red-800">
                    {typedErrors.split("\n").map((line, index) => (
                        <Fragment key={index}>
                            {line}
                            <br />
                        </Fragment>
                    ))}
                </div>
            ) : (
                <p className="monospace">{typedClampValue}</p>
            )}
        </section>
    );
};

export default ClampGenerator;
