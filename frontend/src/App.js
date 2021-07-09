import "./App.css";
import MainItem from "./components/MainItem";
import {useState, useEffect} from "react";
import axios from "axios";

const API_url = "http://127.0.0.1:5000";

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
        const response = await axios.get(API_url + "/all");
        setData(response.data);
    };

    useEffect(() => { apiRequest() }, []);

    console.log(data);

    const [formData, setFormData] = useState();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData);
        const addRequest = async () => {
            const response = await axios.get(API_url + `/add/${formData['keyword-input']}/${formData['since-input']}/${formData['quantity-input']}`);
            console.log(response);
        };

        addRequest();
    };

    if(!data){
        return <p>Loading...</p>;
    } else {
        return (
            <>
                <p>Keywords:</p>
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
                <p id="form-paragraph">New Keyword:</p>
                <form id="input-form">
                    <input name="keyword-input" type="text" onChange={handleChange} placeholder="Keyword"></input>
                    <input name="since-input" type="text" onChange={handleChange} placeholder="Since"></input>
                    <input name="quantity-input" type="number" onChange={handleChange} placeholder="# of Tweets"></input>
                    <br />
                    <button id="submit-button" onClick={handleSubmit}>Submit</button>
                </form>
            </>
        );
    }
}

function Form() {
    const [formData, setFormData] = useState();

    const handleChange = (e) => {
        setFormData({
          ...formData, [e.target.name]: e.target.value.trim()
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData);
        const apiRequest = async () => {
            const response = await axios.get(API_url + `/add/${formData['keyword-input']}/${formData['since-input']}/${formData['quantity-input']}`);
            console.log(response);
        };

        apiRequest()
    };

    return (
        <>
            <p id="form-paragraph">New Keyword:</p>
            <form id="input-form">
                <input name="keyword-input" type="text" onChange={handleChange} placeholder="Keyword"></input>
                <input name="since-input" type="text" onChange={handleChange} placeholder="Since"></input>
                <input name="quantity-input" type="number" onChange={handleChange} placeholder="# of Tweets"></input>
                <br />
                <button id="submit-button" onClick={handleSubmit}>Submit</button>
            </form>
        </>
    );
}

function App(props) {
    return (
        <div className="App">
            <Header />
            <Main/>
        </div>
    );
}

export default App;