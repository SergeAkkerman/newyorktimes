import React from "react";
import logo from "./logo.svg";
import Articleslist from "./components/Articleslist";
import TestArticle from "./Testarticle";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Articleslist />
      <TestArticle />
    </div>
  );
}

export default App;
