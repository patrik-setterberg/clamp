import { useState, useEffect } from "react";

/**
 * Custom hook that simulates a typing effect by gradually displaying and erasing text.
 *
 * @param texts - An array of strings representing the texts to be typed.
 * @returns A tuple containing the currently displayed text and a boolean indicating if the typing effect is completed.
 */
const useTypingEffect = (texts: string[]): [string, boolean] => {
    const TYPING_SPEED: number = 40;
    const VARIANCE: number = 20;
    const ERASING_SPEED: number = 40;
    const PAUSE: number = 750;

    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isErasing, setIsErasing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (isCompleted) return;

        let timerId: number;
        const currentText = texts[currentIndex];

        if (!isErasing) {
            if (displayedText.length < currentText.length) {
                const randomDelay =
                    TYPING_SPEED - VARIANCE + Math.random() * (VARIANCE * 2);
                timerId = window.setTimeout(() => {
                    setDisplayedText(
                        currentText.substring(0, displayedText.length + 1),
                    );
                }, randomDelay);
            } else if (currentIndex === texts.length - 1) {
                // If the current text is the last in the array, mark the cycle as completed.
                setIsCompleted(true);
            } else {
                // Once the current text is fully typed, start erasing after a pause.
                timerId = window.setTimeout(() => setIsErasing(true), PAUSE);
            }
        } else {
            if (displayedText.length > 0) {
                timerId = window.setTimeout(() => {
                    setDisplayedText(displayedText.slice(0, -1));
                }, ERASING_SPEED);
            } else {
                setIsErasing(false);
                // Move to the next text in the array after erasing the current text
                setCurrentIndex(currentIndex + 1);
            }
        }

        return () => clearTimeout(timerId);
    }, [displayedText, currentIndex, isErasing, texts, isCompleted]);

    return [displayedText, isCompleted];
};

export default useTypingEffect;
