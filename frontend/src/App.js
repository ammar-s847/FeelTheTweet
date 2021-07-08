import "./App.css";
import MainItem from "./components/MainItem";
import {useState, useEffect} from "react";
import axios from "axios";

function Header() {
    return (
        <>
            <h1>Feel The Tweet</h1>
        </>
    );
}

function Main() {
    const [data, setData] = useState();
    
    const apiRequest = async () => {
        const response = await axios.get("http://127.0.0.1:5000/all");
        setData(response.data);
    };

    useEffect(() => { apiRequest() }, []);

    console.log(data);

    if(!data){
        return <p>Loading...</p>;
    } else {
        return (
            <>
                {data['data'].map(item => {
                    return (
                        <MainItem 
                            key={item.keyword}
                            keyword={item.keyword}
                            score={item.score}
                            score_name={item['score-name']}
                            since={item.since}
                            quantity={item.quantity}
                        />
                    );
                })}
            </>
        );
    }
}

function Form() {
    return (
        <>
            <p>form</p>
        </>
    );
}

function App(props) {
    return (
        <div className="App">
            <Header />
            <Main/>
            <Form />
        </div>
    );
}

export default App;