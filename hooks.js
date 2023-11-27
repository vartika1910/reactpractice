import React, { useState, useEffect, createContext, useContext } from "react";
import ReactDOM from "react-dom";
const ThemeContext = createContext();

const countInitialization = () => {
    return 0;
}

const themeInitialization = () => {
    return '';
}

const Counting = () => {
    const [count, setCount] = useState(countInitialization);
    const [theme, setTheme] = useState(themeInitialization);

    const sub = () => {
        setCount(prevCount => prevCount - 1)
        setTheme('substraction')
    }

    const add = () => {
        setCount(prevCount => prevCount + 1)
        setTheme('addition')
    }

    useEffect(() => {
        console.log("theme change");
    }, [theme]);


    return (
        <>
            <button onClick={add}>+</button>
            <div>{count}{theme}</div>
            <button onClick={sub}>-</button>
        </>
    )
}

const Header = () => {
    const theme = useContext(ThemeContext);
    return <header style={{ background: theme === 'light' ? 'lightgray' : 'red' }}>Header</header>;
}

const Main = () => {
    const theme = useContext(ThemeContext);
    return (
        <main style={{ background: theme === 'light' ? 'white' : 'black', color: theme === 'light' ? 'black' : 'white' }}>
            Main Content
        </main>
    );
}

const Footer = () => {
    const theme = useContext(ThemeContext);
    return <footer style={{ background: theme === 'light' ? 'lightgray' : 'red' }}>Footer</footer>;
}


const App = () => {
    const [theme, setTheme] = useState('light');
    // console.log("abcd")
    return (
        <ThemeContext.Provider value={theme}>
            <div>
                <Header />
                <Main />
                <Footer />
                <div>
                <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                    Change Theme            
                </button>
                </div>
                <Counting />
                
            </div>
        </ThemeContext.Provider>
    );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
