import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

const App = () => {
    const [title, setTitle] = useState("")
    const [apiData, setApiData] = useState([])
    useEffect(() => {
        fetchData()
    }, [title]);

    const fetchData = async () => {
        const data = await fetch(`https://jsonplaceholder.typicode.com/${title}`);
        const jsonData = await data.json();
        console.log(jsonData)
        setApiData(jsonData)
    }

    return (
        <>
            <button type="button" onClick={() => {
                setTitle("posts")
            }}>post</button>
            <button type="button" onClick={() => {
                setTitle("users")
            }}>user</button>
            <button type="button" onClick={() => {
                setTitle("comments")
            }}>comments</button>
            <h2>{title}</h2>
            {
                apiData.map((data) => {
                    return <p>{JSON.stringify(data)}</p>
                })
            }
        </>
    )

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)