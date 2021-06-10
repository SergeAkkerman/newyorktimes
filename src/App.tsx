import styles from "./scss/base/base.module.scss";
import "./scss/base/fonts.scss";
import Header from "./components/Header";
import AllRoutes from "./components/Routes";
import CheckUserAuth from "./components/CheckUserAuth";

function App() {
	return (
		<div className={styles.app}>
			{CheckUserAuth()}
			<Header />
			<AllRoutes />
		</div>
	);
}

export default App;
