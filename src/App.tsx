import { useEffect } from "react";
import { clsx } from "clsx/lite";

// Components.
import Header from "./components/Header";
import Main from "./components/Main";
import Link from "./components/Link";
import Box from "./components/Box";
import ClampGenerator from "./components/ClampGenerator";
import PreviewText from "./components/PreviewText";
import Footer from "./components/Footer";
import ThemeSelector from "./components/ThemeSelector";

// Assets.
import codeIcon from "./assets/images/code.svg";
import codeIconDarkMode from "./assets/images/code-dark-mode.svg";

// Store.
import { useStore } from "./store/uiToolsStore";

// Styles.
import "./App.css";

function App() {
    const hasErrors = useStore((state) => state.hasErrors);
    const theme = useStore((state) => state.theme);

    useEffect(() => {
        // Set theme class on document.documentElement.
        document.documentElement.className = theme;
    }, [theme]);

    return (
        <>
            <Header>
                <div className="flex items-center">
                    <img
                        src={theme === "dark" ? codeIconDarkMode : codeIcon}
                        alt="Code icon"
                        className="h-8 w-8"
                        aria-hidden="true"
                    />
                    <h1
                        className={clsx(
                            "text-almost-black ml-2 text-xl font-bold dark:text-white",
                            "transition-colors duration-100 ease-out",
                        )}
                    >
                        clamp.zone
                    </h1>
                </div>
                <ThemeSelector />
            </Header>
            <Main>
                <Box>
                    <ClampGenerator />
                </Box>
                <div className="mx-auto mt-2 w-full max-w-box px-4">
                    <p
                        className={clsx(
                            "text-almost-black text-left text-xs sm:text-right dark:text-gray-pale",
                            "transition-colors duration-100 ease-out",
                        )}
                    >
                        Learn more about{" "}
                        <Link
                            newTab={true}
                            href="https://developer.mozilla.org/en-US/docs/Web/CSS/clamp"
                        >
                            clamp()
                        </Link>{" "}
                        and{" "}
                        <Link
                            newTab={true}
                            href="https://css-tricks.com/snippets/css/fluid-typography/"
                        >
                            fluid typography
                        </Link>
                        .
                    </p>
                </div>
                {!hasErrors && <PreviewText />}
            </Main>
            <Footer />
        </>
    );
}

export default App;
