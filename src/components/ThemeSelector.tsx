import { useStore } from "../store/uiToolsStore";

const ThemeSelector = (): JSX.Element => {
    const theme = useStore((state) => state.theme);
    const setTheme = useStore((state) => state.setTheme);

    return (
        <button className="text-burgundy dark:text-white" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme}
        </button>
    );
};

export default ThemeSelector;
