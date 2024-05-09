import { useState, useEffect } from "react";

/**
 * A React hook that simulates the effect of typing text character by character.
 *
 * @param text - The text to be typed.
 * @param typingSpeed - The average speed of typing in milliseconds per character.
 * @param variance - The variance in typing speed. This makes the typing effect more realistic.
 * @returns The text that has been "typed" so far.
 */
function useTypingEffect(text: string, typingSpeed: number, variance: number) {
    const [outputText, setOutputText] = useState("");

    useEffect(() => {
        let index = 0;
        let timeoutId: number; // Change this line

        // Function to type the next character
        const typeNextCharacter = () => {
            if (index < text.length) {
                setOutputText((prev) => prev + text.charAt(index));

                // Calculate the speed for typing the next character
                let speed =
                    typingSpeed +
                    Math.floor(Math.random() * variance * 2) -
                    variance;
                speed = Math.max(speed, 1); // Ensure speed is at least 1 ms

                index++; // Increment the index

                // Schedule the typing of the next character
                timeoutId = setTimeout(typeNextCharacter, speed);
            }
        };

        // Start the typing effect
        typeNextCharacter(); 

        // Clear the timeout when the component unmounts or the dependencies change
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [text, typingSpeed, variance]);

    return outputText;
}

export default useTypingEffect;
