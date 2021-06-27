import "./App.css";

function Header(props) {
  console.log(props);
  return (
    <header>
      <h1>Feel The Tweet</h1>
    </header>
  );
}

function Main(props) {
  return (
    <section>
      <p>We analyze the sentiment of your favourite keywords on Twitter.</p>
    </section>
  );
}

function MainItem(props) {}

function Form(props) {
  return <div></div>;
}

function App(props) {
  return (
    <div className="App">
      <Header />
      <Main />
      <Form />
    </div>
  );
}

export default App;
