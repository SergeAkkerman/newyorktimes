import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import throttle from "lodash.throttle";
import { getFirestore } from "redux-firestore";
import { getFirebase } from "react-redux-firebase";

import rootReducer from "./reducers/index";
import { loadState, saveState } from "./LocalStorage";

const persistedState = loadState();

const store = createStore(
	rootReducer,
	persistedState,
	composeWithDevTools(
		applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
	)
);

store.subscribe(
	throttle(() => {
		saveState({
			articleData: store.getState().articleData,
		});
	}, 500)
);

export default store;
