import { useEffect, useState } from "react";
import clsx from "clsx/lite";

// Components
import NumberInputWithSelect from "./NumberInputWithSelect";
import CopyButton from "./CopyButton";

// Store
import { useStore } from "../store/uiToolsStore";

// Helpers
import generateClamp from "../helpers/generateClamp";
import selectText from "../helpers/selectText";

// Assets
import angleup from "../assets/images/angleup.svg";
import error from "../assets/images/error.svg";
import info from "../assets/images/info.svg";

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
    const { clampValue, setClampValue } = useStore((state) => ({
        clampValue: state.clampValue,
        setClampValue: state.setClampValue,
    }));

    const { setHasErrors } = useStore((state) => ({
        hasErrors: state.hasErrors,
        setHasErrors: state.setHasErrors,
    }));

    /**
     * Error handling.
     */
    type Fields = {
        minViewportWidth?: string;
        maxViewportWidth?: string;
        minValue?: string;
        maxValue?: string;
        remSize?: string;
    };

    const [errors, setErrors] = useState<Fields>({});
    const [errorMessages, setErrorMessages] = useState("");

    // We set error messages when the errors object changes.
    useEffect(() => {
        setErrorMessages(
            Object.values(errors)
                .filter((error, index, self) => self.indexOf(error) === index)
                .join("\n"),
        );
    }, [errors]);

    useEffect(() => {
        setHasErrors(!!errorMessages);
    }, [errorMessages]);

    const [cautions, setCautions] = useState<Fields>({});
    const [cautionMessages, setCautionMessages] = useState("");

    // Similarly we set caution messages when the errors object changes.
    useEffect(() => {
        setCautionMessages(
            Object.values(cautions)
                .filter(
                    (caution, index, self) => self.indexOf(caution) === index,
                )
                .join("\n"),
        );
    }, [cautions]);

    const TYPING_SPEED: number = 50;
    const VARIANCE: number = 20;
    let title: string = useTypingEffect(
        "Generate clamp()",
        TYPING_SPEED,
        VARIANCE,
    );

    const [copySuccess, setCopySuccess] = useState(false);

    /**
     * Handle the form submission event:
     * Copies the clamp value to the clipboard.
     * @param event - The form submission event.
     */
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        navigator.clipboard.writeText(clampValue).then(
            function () {
                setCopySuccess(true);
                setTimeout(() => {
                    setCopySuccess(false);
                }, 2000);
            },
            function (err) {
                console.error(err);
            },
        );
    };

    useEffect(() => {
        setErrors({});

        const {
            result,
            errors: newErrors,
            cautions: newCautions,
        } = generateClamp(
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
            const errorObject: Fields = newErrors.reduce((acc, curr) => {
                return { ...acc, [curr.param]: curr.message };
            }, {});

            setErrors(errorObject);
        } else {
            typeof result === "string" && setClampValue(result);
        }

        if (newCautions) {
            const cautionObject: Fields = newCautions.reduce((acc, curr) => {
                return { ...acc, [curr.param]: curr.message };
            }, {});
            setCautions(cautionObject);
        }
    }, [minViewportWidth, maxViewportWidth, minValue, maxValue]);

    return (
        <>
            <div className="mb-4 flex items-center gap-4">
                <div className="rounded-md bg-onyx p-2">
                    <img src={angleup} alt="" />
                </div>
                <div>
                    <h2 className="font-mono text-lg font-semibold text-white">
                        {title}
                    </h2>
                </div>
            </div>
            <p className="mb-9 text-sm text-white">
                Create linearly scaling fluid size values based on viewport
                width.
            </p>

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
                    caution={cautions.minViewportWidth !== undefined}
                />
                <NumberInputWithSelect
                    label="Max viewport width"
                    inputValue={String(maxViewportWidth)}
                    inputOnChange={setMaxViewportWidth}
                    selectValue={maxViewportWidthUnit}
                    selectOnChange={setMaxViewportWidthUnit}
                    error={errors.maxViewportWidth !== undefined}
                    caution={cautions.maxViewportWidth !== undefined}
                />
                <NumberInputWithSelect
                    label="Min value"
                    inputValue={String(minValue)}
                    inputOnChange={setMinValue}
                    selectValue={minValueUnit}
                    selectOnChange={setMinValueUnit}
                    error={errors.minValue !== undefined}
                    caution={cautions.minValue !== undefined}
                />
                <NumberInputWithSelect
                    label="Max value"
                    inputValue={String(maxValue)}
                    inputOnChange={setMaxValue}
                    selectValue={maxValueUnit}
                    selectOnChange={setMaxValueUnit}
                    error={errors.maxValue !== undefined}
                    caution={cautions.maxValue !== undefined}
                />
                {!!errorMessages && (
                    <div className="col-span-2 mt-6 flex items-center gap-2.5 rounded-md bg-error-dark px-3 py-2.5 text-sm text-white">
                        <img
                            src={error}
                            className="h-fit"
                            alt="Error icon"
                            aria-hidden="true"
                        />
                        <ul className="flex list-none flex-col gap-1">
                            {errorMessages.split("\n").map((line, index) => (
                                <li
                                    key={index}
                                    className="font-medium leading-normal"
                                >
                                    {line}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {!errorMessages && !!cautionMessages && (
                    <div className="bg-caution col-span-2 mt-6 flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-dark">
                        <img
                            src={info}
                            className="h-fit"
                            alt="Info icon"
                            aria-hidden="true"
                        />
                        <ul className="flex list-none flex-col gap-1">
                            {cautionMessages.split("\n").map((line, index) => (
                                <li
                                    key={index}
                                    className="font-medium leading-normal"
                                >
                                    {line}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {!errorMessages && !!clampValue && (
                    <div
                        className={clsx(
                            "col-span-2 flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0",
                            cautionMessages ? "mt-2" : "mt-6",
                        )}
                    >
                        <code
                            className={clsx(
                                "block max-w-full flex-grow overflow-x-auto whitespace-nowrap rounded-bl-md rounded-tl-md bg-onyx px-4 py-3 text-sm text-white max-sm:w-full max-sm:rounded-md sm:py-2.5 sm:text-base",
                                "focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-blue hover:focus-visible:outline-none sm:focus-visible:mr-1.5",
                            )}
                            onClick={selectText}
                        >
                            {clampValue}
                        </code>

                        <CopyButton copySuccess={copySuccess} />
                    </div>
                )}
            </form>
        </>
    );
};

export default ClampGenerator;
