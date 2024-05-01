import { create, StateCreator } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

// Clamp generator state values for the store.
type ClampGeneratorStateValues = {
    minViewportWidth: number; // The minimum viewport width.
    maxViewportWidth: number; // The maximum viewport width.
    minValue: number; // The minimum value.
    maxValue: number; // The maximum value.
    unit: "px" | "rem"; // The unit of measurement.
    remSize: number; // The size of 1 rem in pixels.
};

// Other state values.
// type OtherStateValues = {
    // Add other state values here.
// };

// The store, including state values and actions.
// type Store = ClampGeneratorStateValues & OtherStateValues & {
type Store = ClampGeneratorStateValues & {
    setMinViewportWidth: (value: number) => void; // Function to set the minimum viewport width.
    setMaxViewportWidth: (value: number) => void; // Function to set the maximum viewport width.
    setMinValue: (value: number) => void; // Function to set the minimum value.
    setMaxValue: (value: number) => void; // Function to set the maximum value.
    setUnit: (value: "px" | "rem") => void; // Function to set the unit of measurement.
    setRemSize: (value: number) => void; // Function to set the size of 1 rem in pixels.
    // Other setters here.
};

// Default state values for the store.
// const defaultState: ClampGeneratorStateValues & OtherStateValues = {
const defaultState: ClampGeneratorStateValues = {
    minViewportWidth: 0,
    maxViewportWidth: 0,
    minValue: 0,
    maxValue: 0,
    unit: "px",
    remSize: 16,
};

// Storage middleware for persisting state in localStorage.
// const localStoragePersist: PersistStorage<ClampGeneratorStateValues & OtherStateValues> = {
const localStoragePersist: PersistStorage<ClampGeneratorStateValues> = {
    getItem: (name) => {
        // Get the item from localStorage
        const item = localStorage.getItem(name);
        if (item) {
            // Parse the item and extract the state and timestamp
            const { state, timestamp } = JSON.parse(item);

            const currentTime = Date.now();
            const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
            // If the current time is more than 24 hours later than the stored timestamp,
            // return null to reset the state to its default values
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
            setUnit: (value) => set({ unit: value }),
            setRemSize: (value) => set({ remSize: value }),
        }),
        {
            name: "ui-tools-storage", // unique name
            storage: localStoragePersist, // specify localStorage as the storage option
            migrate: (persistedState: unknown, _: number) => {
                const state = persistedState as Partial<Store>;
                if (state) {
                    return {
                        minViewportWidth: Number(state.minViewportWidth),
                        maxViewportWidth: Number(state.maxViewportWidth),
                        minValue: Number(state.minValue),
                        maxValue: Number(state.maxValue),
                        unit: state.unit as "px" | "rem",
                        remSize: Number(state.remSize),
                    };
                }
                // return default state if persistedState is undefined
                return defaultState;
            },
        },
    ) as StateCreator<Store>,
);
