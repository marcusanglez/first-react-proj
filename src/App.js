import logo from './logo.svg';
import './App.css';
import React from "react";

const myElem = (
    <div>
      <h1>Hi </h1>
    </div>
)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. Marco's hello World!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <MyButton></MyButton>
        <myElem></myElem>
      </header>
    </div>
  );
}

function MyButton(){
  return (
      <button>I'm a button</button>
  )
}

export default App;
