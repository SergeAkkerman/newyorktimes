import React from "react";
import logo from "./logo.svg";
import Articleslist from "./components/Articleslist";
import ShowArticle from "./ShowArticle";

function App() {
	return (
		<div className="App">
			<header className="App-header"></header>
			<Articleslist />
			<ShowArticle />
		</div>
	);
}

export default App;
