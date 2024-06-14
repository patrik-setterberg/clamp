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

// Store.
import { useStore } from "./store/uiToolsStore";

// Styles.
import "./App.css";

function App() {
    const hasErrors = useStore((state) => state.hasErrors);

    // Prevent animations on page load.
    useEffect(() => {
        document.documentElement.classList.add("no-animate");
        setTimeout(() => {
            document.documentElement.classList.remove("no-animate");
        }, 1000);
    }, []);

    return (
        <>
            <Header />
            <Main>
                <Box>
                    <ClampGenerator />
                </Box>
                <div className="mx-auto mt-2 w-full max-w-box px-4">
                    <p
                        className={clsx(
                            "text-almost-black dark:text-gray-pale text-left text-xs sm:text-right",
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
