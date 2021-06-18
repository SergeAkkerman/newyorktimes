import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/Store";
import { BrowserRouter } from "react-router-dom";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import reportWebVitals from "./reportWebVitals";

import firebase from "firebase";
import App from "./App";

const rrfConfig = {
	userProfile: "users",
	useFirestoreForProfile: true,
};

const rrfProps = {
	firebase,
	dispatch: store.dispatch,
	config: rrfConfig,
	createFirestoreInstance,
};

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<ReactReduxFirebaseProvider {...rrfProps}>
				<App />
			</ReactReduxFirebaseProvider>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

reportWebVitals();
