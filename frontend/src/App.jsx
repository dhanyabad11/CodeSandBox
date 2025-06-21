import "./App.css";
import { PingComponent } from "./components/atoms/PingComponent";
import usePing from "./hooks/apis/queries/usePing";
import { useState } from "react";

function App() {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <>
            <button onClick={() => setIsVisible(!isVisible)}>Toggle</button>
            {isVisible && <PingComponent />}
        </>
    );
}

export default App;
