import './App.css';

function Header() {
    return (
        <header>
            <h1>Feel the Tweet</h1>
        </header>
    );
}

function Main() {
    return (
        <section>
          <p>We analyze the sentiment of your favourite keywords on Twitter.</p>
        </section>
    );
}

function Form() {
  return (
    <div></div>
  );
}

function App() {
    return (
      <div className="App">
          <Header />
          <Main />
          <Form />
      </div>
    );
}

export default App;