import { createStore } from "redux";
import throttle from "lodash.throttle";
import rootReducer from "./reducers";
import { loadState, saveState } from "./LocalStorage";

const persistedState = loadState();

const store = createStore(
	rootReducer,
	persistedState,
	(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(
	throttle(() => {
		saveState({
			ARTICLE_DATA_TOSTORE: store.getState().ARTICLE_DATA_TO_STORE,
		});
	}, 1000)
);

export default store;

// export default createStore(
// 	rootReducer,
// 	persistedState,
// 	(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
// 		(window as any).__REDUX_DEVTOOLS_EXTENSION__()
// );
