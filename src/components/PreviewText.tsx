import { useState, useEffect, useRef } from "react";
import { clsx } from "clsx/lite";

// Store
import { useStore } from "../store/uiToolsStore";

// Helpers.
import roundToFourDecimals from "../helpers/roundToFourDecimals";

// Hooks.
import useTypingEffect from "../hooks/useTypingEffect";

/**
 * Renders a preview text component with dynamic font size and visibility effects.
 * The font size is based on the clamp value and the visibility effects
 * are based on the viewport width.
 *
 * @returns The rendered PreviewText component.
 */
const PreviewText = (): JSX.Element => {
    const [inputValue, setInputValue] = useState<string>("");

    const clampValue = useStore((state) => state.clampValue);
    const maxViewportWidth = useStore((state) => state.maxViewportWidth);
    const maxViewportWidthUnit = useStore(
        (state) => state.maxViewportWidthUnit,
    );

    /**
     * Displays the current font-size in pixels and rems.
     */
    function setSizeText(): void {
        if (
            previewInputRef.current &&
            pxSizeRef.current &&
            remSizeRef.current
        ) {
            // Get the current font size of the text.
            const fontSize: string = window.getComputedStyle(
                previewInputRef.current,
            ).fontSize;
            const fontSizeInRem: number = parseFloat(fontSize) / 16;
            pxSizeRef.current.innerText = `${roundToFourDecimals(parseFloat(fontSize))}px`;
            remSizeRef.current.innerText = `${roundToFourDecimals(fontSizeInRem)}rem`;
        }
    }

    const pxSizeRef = useRef<HTMLSpanElement>(null);
    const remSizeRef = useRef<HTMLSpanElement>(null);
    const previewInputRef = useRef<HTMLInputElement>(null);

    // Update the paragraph text when the clamp value changes.
    useEffect(() => {
        setSizeText();
    }, [clampValue]);

    const [maxViewportWidthInPixels, setMaxViewportWidthInPixels] =
        useState<number>(
            maxViewportWidthUnit === "rem"
                ? maxViewportWidth * 16
                : maxViewportWidth,
        );

    const maxViewportWidthInPixelsRef = useRef(maxViewportWidthInPixels);

    // Update the max viewport width in pixels when the max viewport width changes.
    useEffect(() => {
        maxViewportWidthInPixelsRef.current =
            maxViewportWidthUnit === "rem"
                ? maxViewportWidth * 16
                : maxViewportWidth;

        setMaxViewportWidthInPixels(maxViewportWidthInPixelsRef.current);
    }, [maxViewportWidth]);

    const resizeTimeoutRef = useRef<number | null>(null);
    const [backgroundIsVisible, setBackgroundIsVisible] =
        useState<boolean>(false);
    const [borderIsVisible, setBorderIsVisible] = useState<boolean>(false);
    const [isOverflowing, setIsOverflowing] = useState<boolean>(false);

    /**
     * Checks if the preview text is overflowing its container.
     *
     * @returns {boolean} True if the preview text is overflowing, false otherwise.
     */
    function checkIsOverflowing(): boolean {
        if (previewInputRef.current && previewInputRef.current.parentElement) {
            const element: HTMLInputElement = previewInputRef.current;
            const parent: HTMLElement = previewInputRef.current.parentElement;

            return (
                element.scrollWidth > parent.clientWidth ||
                element.scrollHeight > parent.clientHeight
            );
        }

        return false;
    }

    /**
     * Handles the resize event of the window.
     * Updates the paragraph text, shows the preview text background and border,
     * and hides them after a short delay.
     */
    const handleResize = (): void => {
        setSizeText();
        setBackgroundIsVisible(true);
        setBorderIsVisible(
            window.innerWidth <= maxViewportWidthInPixelsRef.current,
        );

        setIsOverflowing(checkIsOverflowing());

        if (resizeTimeoutRef.current) {
            clearTimeout(resizeTimeoutRef.current);
        }

        resizeTimeoutRef.current = setTimeout(() => {
            setBackgroundIsVisible(false);
            setBorderIsVisible(false);
        }, 1000);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Update the isOverflowing state when max viewport width, clampValue, inputValue changes.
    useEffect(() => {
        setIsOverflowing(checkIsOverflowing());
    }, [maxViewportWidth, clampValue, inputValue]);

    const maxViewportWidthTimerRef = useRef<number | null>(null);

    /**
     * Show the preview text background and border for a short duration
     * when the viewport width is less than the max viewport width.
     */
    useEffect(() => {
        setBackgroundIsVisible(true);
        setBorderIsVisible(
            window.innerWidth <= maxViewportWidthInPixelsRef.current,
        );

        if (maxViewportWidthTimerRef.current) {
            clearTimeout(maxViewportWidthTimerRef.current);
        }

        maxViewportWidthTimerRef.current = setTimeout(() => {
            setBackgroundIsVisible(false);
            setBorderIsVisible(false);
        }, 1000);
    }, [maxViewportWidth]);

    let [previewTextDefault, isTypingCompleted] = useTypingEffect([
        "This is a preview text (edit me)",
    ]);

    useEffect(() => {
        if (isTypingCompleted) {
            setInputValue(previewTextDefault); // Initialize input with the last typed text
        }
    }, [isTypingCompleted, previewTextDefault]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div
            className={clsx(
                "mx-auto mt-8 flex w-full flex-col items-center rounded-lg border pt-4",
                "transition-colors duration-500 ease-out",
                backgroundIsVisible && isTypingCompleted
                    ? "bg-white-cloud dark:bg-gray-dark"
                    : "bg-transparent",
                borderIsVisible && isTypingCompleted
                    ? "dark:border-gray-neutral border-[#9e9e9e]"
                    : "border-transparent",
            )}
            style={{
                maxWidth: `${maxViewportWidthInPixelsRef.current - 32}px`,
            }}
        >
            <p
                className={clsx(
                    "text-almost-black inline-block w-full max-w-box px-4 text-xs sm:text-sm dark:text-white",
                    "transition-colors duration-100 ease-out",
                )}
            >
                Current <code className="font-semibold">font-size</code> is:{" "}
                <code className="font-semibold" ref={pxSizeRef}></code> /{" "}
                <code className="font-semibold" ref={remSizeRef}></code>
            </p>
            <div className="flex w-full max-w-box pb-4 pt-2">
                <input
                    type="text"
                    ref={previewInputRef}
                    style={{
                        fontSize: clampValue,
                    }}
                    placeholder={isTypingCompleted ? "Enter text here" : ""}
                    className={clsx(
                        "text-almost-black inline-block w-full overflow-ellipsis rounded-lg border border-transparent bg-transparent px-4 font-medium leading-[2.5] outline outline-2 outline-transparent dark:text-white",
                        "transition-colors duration-100 ease-out",
                        "focus-visible:outline-blue-soft dark:focus-visible:outline-blue-light hover:focus-visible:bg-transparent",
                        isOverflowing &&
                            "focus-visible:bg-gray-mist dark:focus-visible:bg-gray-dark",
                        "dark:hover:bg-gray-dark hover:bg-white-cloud",
                    )}
                    value={isTypingCompleted ? inputValue : previewTextDefault}
                    onChange={handleInputChange}
                    id="preview-text"
                />
                <label htmlFor="preview-text" className="sr-only">
                    Preview text
                </label>
            </div>
        </div>
    );
};

export default PreviewText;
