// Components.
import Header from "./components/Header";
import Main from "./components/Main";
import Link from "./components/Link";
import Box from "./components/Box";
import ClampGenerator from "./components/ClampGenerator";
import PreviewText from "./components/PreviewText";
import Footer from "./components/Footer";

// Assets.
import code from "./assets/images/code.svg";

// Store.
import { useStore } from "./store/uiToolsStore";

// Styles.
import "./App.css";

function App() {

    const hasErrors = useStore((state) => state.hasErrors);

    return (
        <>
            <Header>
                <img src={code} alt="Code icon" className="h-8 w-8" />
                <h1 className="text-cream ml-2 text-xl font-bold">
                    clamp.style
                </h1>
            </Header>
            <Main>
                <Box>
                    <ClampGenerator />
                </Box>
                <div className="max-w-box mx-auto mt-2 w-full px-4">
                    <p className="text-left text-xs text-[#999] sm:text-right">
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
