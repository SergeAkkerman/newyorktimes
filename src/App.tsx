// Main page of the site. At first, UserAuth()
//check user authorisation status. "AllRoutes" component is
// responsible for redirects between all pages.

import styles from "./scss/base/base.module.scss";
import "./scss/base/fonts.scss";
import Header from "./components/Header";
import AllRoutes from "./components/Routes";
import UserAuth from "./components/CheckUserAuth";
import { connect } from "react-redux";

function App() {
	return (
		<div className={styles.app}>
			{UserAuth()}
			<Header />
			<AllRoutes />
		</div>
	);
}

export default connect()(App);
