import './App.css';

function Header() {
    return (
        <header>
            <h1>Feel the Tweet</h1>
        </header>
    );
}

let words = [
    "Item 1",
    "Item 2",
    "Item 3"
];

function Main() {
    return (
        <>
            <p>Welcome to the Website named {props.name}</p>
            <ul style={{textAlign: "left"}}>
                {words.products.map((item) => 
                    <li key={item.id}>{item.name}</li>
                )}
            </ul>
            <img src={sampleImage} alt="Alternative Text"/>
            <footer> 
                <p>{props.year}</p>
            </footer>
            <StateExample1 />
        </>
    );
}

function App() {
    return (
      <div className="App">
          <Header />
          <Main name="Website Name" year={new Date().getFullYear()} products={productsObject}/>
          {props.admin == true ? <p>This is for admins only</p> : null}
      </div>
    );
}

export default App;