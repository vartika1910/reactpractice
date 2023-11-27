import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

const App = () => {
    const [counter, setCounter] = useState(0);
    function incrementCounter() {
        setCounter(counter + 1);
    }
    return (
        <div>
            <button onClick={incrementCounter}>Increment</button>
            <p>Counter: {counter}</p>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


