import { create, StateCreator } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

// Clamp generator state values for the store.
type ClampGeneratorStateValues = {
    minViewportWidth: number;
    maxViewportWidth: number;
    minValue: number;
    maxValue: number;
    remSize: number;
    minViewportWidthUnit: "px" | "rem";
    maxViewportWidthUnit: "px" | "rem";
    minValueUnit: "px" | "rem";
    maxValueUnit: "px" | "rem";
};

// The store, including state values and actions.
type Store = ClampGeneratorStateValues & {
    setMinViewportWidth: (value: number) => void;
    setMaxViewportWidth: (value: number) => void;
    setMinValue: (value: number) => void;
    setMaxValue: (value: number) => void;
    setMinViewportWidthUnit: (value: "px" | "rem") => void;
    setMaxViewportWidthUnit: (value: "px" | "rem") => void;
    setMinValueUnit: (value: "px" | "rem") => void;
    setMaxValueUnit: (value: "px" | "rem") => void;
};

// Default state values for the store.
const defaultState: ClampGeneratorStateValues = {
    minViewportWidth: 600,
    maxViewportWidth: 1600,
    minValue: 16,
    maxValue: 24,
    remSize: 16, // CONSTANT. MAYBE ADD FUNCTIONALITY TO CHANGE THIS LATER.
    minViewportWidthUnit: "px",
    maxViewportWidthUnit: "px",
    minValueUnit: "px",
    maxValueUnit: "px",
};

// Storage middleware for persisting state in localStorage.
const localStoragePersist: PersistStorage<ClampGeneratorStateValues> = {
    getItem: (name) => {
        // Get the item from localStorage.
        const item = localStorage.getItem(name);
        if (item) {
            // Parse the item and extract the state and timestamp.
            const { state, timestamp } = JSON.parse(item);

            const currentTime = Date.now();
            const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
            /**
             * If the current time is more than 24 hours later than the stored timestamp,
             * return null to reset the state to its default values.
             */
            if (currentTime - timestamp > oneDayInMilliseconds) {
                return Promise.resolve(null);
            } else {
                return Promise.resolve(state);
            }
        } else {
            return Promise.resolve(null);
        }
    },
    setItem: (name, value) => {
        // Store the current time along with the state.
        const item = {
            state: value,
            timestamp: Date.now(),
        };
        return Promise.resolve(
            localStorage.setItem(name, JSON.stringify(item)),
        );
    },
    removeItem: (name) => Promise.resolve(localStorage.removeItem(name)),
};

export const useStore = create<Store>(
    persist(
        (set) => ({
            ...defaultState,
            setMinViewportWidth: (value) => set({ minViewportWidth: value }),
            setMaxViewportWidth: (value) => set({ maxViewportWidth: value }),
            setMinValue: (value) => set({ minValue: value }),
            setMaxValue: (value) => set({ maxValue: value }),
            setMinViewportWidthUnit: (value) =>
                set({ minViewportWidthUnit: value }),
            setMaxViewportWidthUnit: (value) =>
                set({ maxViewportWidthUnit: value }),
            setMinValueUnit: (value) => set({ minValueUnit: value }),
            setMaxValueUnit: (value) => set({ maxValueUnit: value }),
        }),
        {
            name: "clamp-storage", // Unique name.
            storage: localStoragePersist, // Specify localStorage as the storage option.
            migrate: (persistedState: unknown, _: number) => {
                const state = persistedState as Partial<Store>;
                if (state) {
                    return {
                        minViewportWidth: Number(state.minViewportWidth),
                        maxViewportWidth: Number(state.maxViewportWidth),
                        minValue: Number(state.minValue),
                        maxValue: Number(state.maxValue),
                        remSize: Number(state.remSize),
                        minViewportWidthUnit: state.minViewportWidthUnit as
                            | "px"
                            | "rem",
                        maxViewportWidthUnit: state.maxViewportWidthUnit as
                            | "px"
                            | "rem",
                        minValueUnit: state.minValueUnit as "px" | "rem",
                        maxValueUnit: state.maxValueUnit as "px" | "rem",
                    };
                }
                // Return default state if persistedState is undefined.
                return defaultState;
            },
        },
    ) as StateCreator<Store>,
);
