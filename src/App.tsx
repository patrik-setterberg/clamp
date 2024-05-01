import "./App.css";

// Components
import Gear from "./components/Gear";
import Header from "./components/Header";
import Main from "./components/Main";
import Button from "./components/Button";
import ClampGenerator from "./components/ClampGenerator";

function App() {
    return (
        <>
            <Header>
                <span className="text-sm font-bold text-light">
                    {"{"} ui-tools.dev {"}"}
                </span>
            </Header>
            <Main>
                <Gear
                    classNames="left-0 z-0 top-full h-[40vw] w-[40vw] -translate-x-1/2 -translate-y-1/2"
                    animationClass="animate-spin"
                />
                <Gear
                    classNames="left-full z-0 top-0 h-[65vw] w-[65vw] -translate-x-2/3 -translate-y-1/3"
                    animationClass="animate-spin-reverse"
                />

                <h1 className="text-black">ui tools</h1>
                <ClampGenerator />

                <Button
                    classNames=""
                    label="Click me"
                    func={() => console.log("Button clicked")}
                />
            </Main>
        </>
    );
}

export default App;
