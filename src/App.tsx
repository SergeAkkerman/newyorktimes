import React from "react";
import logo from "./logo.svg";
import Articleslist from "./components/Articleslist";
import ShowArticle from "./components/ShowArticle";
import styles from "./scss/base/base.module.scss";
import "./scss/base/fonts.scss";

function App() {
	return (
		<div className={styles.app}>
			<header></header>
			<Articleslist />
		</div>
	);
}

export default App;
