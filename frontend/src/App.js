import "./App.css";
import MainItem from "./components/MainItem";
import {useState} from "react";

function Header() {
    return (
        <>
            <h1>Feel The Tweet</h1>
        </>
    );
}

/*
async function getapi(url) {
    const response = await fetch(url);
    var data = await response.json();
    return data;
}
console.log(getapi("http://127.0.0.1:5000/all"))*/

//let data = getapi("http://127.0.0.1:5000/all");

//let fetchData = fetch("http://127.0.0.1:5000/all").then((response) => {response.json()});

//const inputData = data['data'].map((item, i) => ({id: i, keyword: item.keyword}));

//var display = inputData.map((data) => { return (<MainItem data={data} />); });
/*
{props.data.map((item) => 
    <li>{item.keyword}</li>
)}
*/

const products = [
    "Item 1",
    "Item 2",
    "Item 3"
];

const productsObject = products.map((item, i) => ({id: i, name: item}));

function Main(props) {
    //const [data, setData] = useState();
    const fetchData = fetch("http://127.0.0.1:5000/all")
    .then((response) => response.json())
    .then((res) => { return res; });

    //console.log(fetchData);

    var inputData = [];

    const displayData = async () => {
        const a = await fetchData;
        for (let i of a.data) {
            inputData.push(i);
        }
    };
    displayData();

    console.log(inputData);

    return (
        <>
            <p>Welcome to the Website</p>
            {inputData.map(item => {
                console.log("hey");
                return (<p>{item.keyword}</p>)
            })}
            {props.products.map((item) => 
                <p key={item.id}>{item.name} {inputData[0]}</p>
            )}
        </>
    );
}

function Form(props) {
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
            <Main products={productsObject}/>
            <Form />
        </div>
    );
}

export default App;