import { useState, useEffect, useRef } from "react";
import { clsx } from "clsx/lite";

// Store
import { useStore } from "../store/uiToolsStore";

// Helpers.
import formatNumber from "../helpers/formatNumber";

const PreviewText = (): JSX.Element => {
    const clampValue = useStore((state) => state.clampValue);
    const maxViewportWidth = useStore((state) => state.maxViewportWidth);
    const maxViewportWidthUnit = useStore(
        (state) => state.maxViewportWidthUnit,
    );

    const [previewTextIsVisible, setPreviewTextIsVisible] =
        useState<boolean>(false);

    // Show preview text shortly after initial load.
    useEffect(() => {
        const timer = setTimeout(() => {
            setPreviewTextIsVisible(true);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    /**
     * Sets the paragraph text and displays the font size in pixels and rems.
     */
    function setParagraphText(): void {
        if (previewTextRef.current) {
            // Get the current font size of the text.
            const fontSize: string = window.getComputedStyle(
                previewTextRef.current,
            ).fontSize;
            const fontSizeInRem: number = parseFloat(fontSize) / 16;
            previewTextRef.current.innerText = `This text's font-size is ${formatNumber(parseFloat(fontSize))}px / ${formatNumber(fontSizeInRem)}rem`;
        }
    }

    const previewTextRef = useRef<HTMLParagraphElement>(null);

    // Update the paragraph text when the clamp value changes.
    useEffect(() => {
        setParagraphText();
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

    const timeoutRef = useRef<number | null>(null);
    const [backgroundIsVisible, setBackgroundIsVisible] =
        useState<boolean>(false);
    const [borderIsVisible, setBorderIsVisible] = useState<boolean>(false);
    const [isOverflowing, setIsOverflowing] = useState<boolean>(false);

    /**
     * Handles the resize event of the window.
     * Updates the paragraph text, shows the preview text background and border,
     * and hides them after a short delay.
     */
    const handleResize = (): void => {
        setParagraphText();
        setBackgroundIsVisible(true);
        setBorderIsVisible(
            window.innerWidth <= maxViewportWidthInPixelsRef.current + 32,
        );
        previewTextRef.current &&
            setIsOverflowing(
                previewTextRef.current.scrollWidth >
                    previewTextRef.current.clientWidth,
            );

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
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

    // Update the isOverflowing state when the max viewport width changes.
    useEffect(() => {
        previewTextRef.current &&
            setIsOverflowing(
                previewTextRef.current.scrollWidth >
                    previewTextRef.current.clientWidth,
            );
    }, [maxViewportWidth]);

    return (
        <div
            className="mx-auto mt-12 flex w-full justify-center"
            style={{
                maxWidth: `${maxViewportWidthUnit === "rem" ? maxViewportWidth * 16 : maxViewportWidth}px`,
            }}
        >
            <p
                style={{
                    fontSize: clampValue || "1rem",
                }}
                className={clsx(
                    "inline-block w-full font-medium overflow-x-auto whitespace-nowrap rounded-lg border p-4 text-center leading-normal text-white transition duration-500",
                    previewTextIsVisible
                        ? "scale-100 opacity-100"
                        : "scale-90 opacity-0",
                    backgroundIsVisible || isOverflowing
                        ? "bg-white-50"
                        : "bg-transparent",
                    borderIsVisible || isOverflowing
                        ? "border-white-500"
                        : "border-transparent",
                )}
                ref={previewTextRef}
            >
                I, too, am moist
            </p>
        </div>
    );
};

export default PreviewText;
