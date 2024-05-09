import "./App.css";

// Components
import Header from "./components/Header";
import Main from "./components/Main";
// import Gear from "./components/Gear";
import Box from "./components/Box";
import ClampGenerator from "./components/ClampGenerator";

// Assets
import code from "./assets/images/code.svg";

function App() {
    return (
        <>
            <Header>
                <div className="flex items-center">
                    <img src={code} alt="Code icon" className="h-8 w-8" />
                    <h1 className="text-cream ml-2 text-xl font-bold">
                        ui-tools.dev
                    </h1>
                </div>
            </Header>
            <Main>
                {/* <Gear
                    classNames="left-0 z-0 top-full h-[40vw] w-[40vw] -translate-x-1/2 -translate-y-1/2 opacity-50"
                    animationClass="animate-spin"
                />
                <Gear
                    classNames="left-full z-0 top-0 h-[65vw] w-[65vw] -translate-x-2/3 -translate-y-1/3 opacity-50"
                    animationClass="animate-spin-reverse"
                /> */}
                <Box>
                    <ClampGenerator />
                </Box>
                <div className="mx-auto mt-2 w-full max-w-[640px] pr-4">
                    <p className="text-xs text-[#999] text-right">
                        Learn more about{" "}
                        <a
                            href="https://developer.mozilla.org/en-US/docs/Web/CSS/clamp"
                            className="font-semibold text-blue"
                            target="_blank"
                        >
                            clamp()
                        </a>{" "}
                        and{" "}
                        <a
                            href="https://css-tricks.com/snippets/css/fluid-typography/"
                            className="font-semibold text-blue"
                            target="_blank"
                        >
                            fluid typography
                        </a>
                    </p>
                </div>
            </Main>
        </>
    );
}

export default App;
